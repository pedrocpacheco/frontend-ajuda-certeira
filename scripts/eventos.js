function getEventos(){
    const cardContainer = document.querySelector("#itens")
    cardContainer.innerHTML = ""

    fetch("https://backend-ajuda-certeria-production.up.railway.app/eventos").then((response) => {
        response.json().then((ongs) =>{
            ongs.map((u) => {
                const ong = document.createElement('div')
                ong.classList.add("card-evento")
                const name = u.name
                const id = u.id
                const adress = u.address
                const imageUrl = u.imageUrl
                const descricao = u.description
                const dia = u.dia
                const creatorName = u.creatorName
                const creatorImageUrl = u.creatorImageUrl
                
                const userInnerHTML = `
                <div class="evento-organizador">
                <div class="image-container-evento">
                    <img src="${imageUrl}" alt="Foto Evento">
                </div>
                <div class="info-organizador">
                    <img class="img-organizador" src="${creatorImageUrl}" alt="Foto Organizador">
                    <p class="nome-organizador">${creatorName}</p>
                </div>
                </div>
                <div class="info-evento">
                <div class="nome-dia">
                    <h3 class="nome">${name}</h2>
                    <p class="dia">${dia}</p>
                </div>
                <span class="adress">${adress}</span>
                <button class="deletar" onclick="deleteOng(${id})">Deletar</button>
                <p class="descricao-evento">${descricao}</p>
                </div>
                `
                ong.innerHTML = userInnerHTML
                cardContainer.appendChild(ong)
            })
        })
    })
}

function deleteOng(id) {
    fetch(`https://backend-ajuda-certeria-production.up.railway.app/eventos/${id}`, {
      method: "DELETE"
    })
    setTimeout(getEventos, 10)
  }

function enviarFormularioParaAPI(formulario) {
    formulario.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const formData = new FormData(formulario);
      const data = Object.fromEntries(formData);
      console.log(JSON.stringify(data));
  
      fetch("https://backend-ajuda-certeria-production.up.railway.app/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      setTimeout(getEventos, 10)
    });
}

const formEl = document.getElementById("form-api")
enviarFormularioParaAPI(formEl)

getEventos()
