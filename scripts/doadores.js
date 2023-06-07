function getDoadores(){
    const cardContainer = document.querySelector("#itens")
    cardContainer.innerHTML = ""

    fetch("https://backend-ajuda-certeria-production.up.railway.app/doadores").then((response) => {
        response.json().then((usuarios) =>{
            usuarios.map((u) => {
                const usuario = document.createElement('div')
                usuario.classList.add("card")
                const name = u.name
                const id = u.id
                const email = u.email
                const imageUrl = u.imageUrl
                const descricao = u.descricao
                
                const userInnerHTML = `
                <div class="image-container">
                    <img src="${imageUrl}" alt="Usuario">
                </div>
                <div class="info">
                    <h3 class="nome">${name}</h2>
                    <span class="email">${email}</span>
                    <button class="deletar" onclick="deleteOng(${id})">Deletar</button>
                    <p class="descricao">${descricao}</p>
                </div>
                `
                usuario.innerHTML = userInnerHTML
                cardContainer.appendChild(usuario)
            })
        })
    })
}

function deleteOng(id) {
    fetch(`https://backend-ajuda-certeria-production.up.railway.app/doadores/${id}`, {
      method: "DELETE"
    })
    setTimeout(getDoadores, 100)
  }

function enviarFormularioParaAPI(formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const formData = new FormData(formulario);
      const data = Object.fromEntries(formData);
      console.log(JSON.stringify(data));
  
      fetch("https://backend-ajuda-certeria-production.up.railway.app/doadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      setTimeout(getDoadores, 100)
    });
  }
  
const formEl = document.getElementById("form-api");
enviarFormularioParaAPI(formEl);


getDoadores()