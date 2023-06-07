function getOngs(){
    const cardContainer = document.querySelector("#itens")
    cardContainer.innerHTML = ""

    fetch("https://backend-ajuda-certeria-production.up.railway.app/ongs").then((response) => {
        response.json().then((ongs) =>{
            ongs.map((u) => {
                const ong = document.createElement('div')
                ong.classList.add("card")
                const name = u.name
                const id = u.id
                const email = u.email
                const imageUrl = u.imageUrl
                const descricao = u.description
                const address = u.address
                
                const userInnerHTML = `
                <div class="image-container">
                    <img src="${imageUrl}" alt="Usuario">
                </div>
                <div class="info">
                    <h3 class="nome">${name}</h2>
                    <span class="email">${email}</span>
                    <button class="deletar" onclick="deleteOng(${id})">Deletar</button>
                    <span class="adress">${address}</span>
                    <p class="descricao">${descricao}</p>
                </div>
                `
                ong.innerHTML = userInnerHTML
                cardContainer.appendChild(ong)
            })
        })
    })
}

function deleteOng(id) {
    fetch(`https://backend-ajuda-certeria-production.up.railway.app/ongs/${id}`, {
      method: "DELETE"
    })
    setTimeout(getOngs, 100)
  }

function enviarFormularioParaAPI(formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const formData = new FormData(formulario);
      const data = Object.fromEntries(formData);
      console.log(JSON.stringify(data));
  
      fetch("https://backend-ajuda-certeria-production.up.railway.app/ongs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      setTimeout(getOngs, 10)
    });
}

const formEl = document.getElementById("form-api")
enviarFormularioParaAPI(formEl)

getOngs()
