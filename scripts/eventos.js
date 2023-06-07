function getEventos(){
    const cardContainer = document.querySelector("#itens")
    cardContainer.innerHTML = ""

    fetch("https://backend-ajuda-certeria-production.up.railway.app/eventos").then((response) => {
        response.json().then((eventos) =>{
            eventos.map((u) => {
                const evento = document.createElement('div')
                evento.classList.add("card-evento")
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
                <div class="botoes-evento">
                <button class="comparecer" onclick="defineCertificado(${id})">Comparecer</button>
                  <button class="deletar" onclick="deleteOng(${id})">Deletar</button>
                </div>
                <p class="descricao-evento">${descricao}</p>
                </div>
                `
                evento.innerHTML = userInnerHTML
                cardContainer.appendChild(evento)
            })
        })
    })
}

function defineCertificado(id){
  const cardContainer = document.querySelector("#certificado")
  cardContainer.innerHTML = ""
  fetch(`https://backend-ajuda-certeria-production.up.railway.app/eventos/${id}`).then((response) =>{
    response.json().then((evento) => {
        const certificado = document.createElement('div')
        certificado.classList.add("certificado")
        const name = evento.name
        const imageUrl = evento.imageUrl
        const creatorImageUrl = evento.creatorImageUrl
        const userInnerHTML = `
          <h1>Parabéns por Comparecer ao Evento: ${name}</h1>
          <p class="subtitulo">Como forma de agradecimento pelo seu apoio, geramos este certificado de comparecimento para você!</p>
          <p class="legenda">(Como ainda não há um cadastro funcional, o certificado sai como "Doador" sempre. No futuro, com login, isto seria modificado)</p>
          <canvas id="myCanvas"></canvas>
        `
        certificado.innerHTML = userInnerHTML
        cardContainer.appendChild(certificado)
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d')


        context.font = '20px Arial';
        context.textAlign = 'center';
        context.fillText('Doador', 150, 82);

        var imageOng = new Image();
        imageOng.src = `${creatorImageUrl}`
        imageOng.onload = function(){
          context.drawImage(imageOng, 75, 95, 60, 40)

        var imageEvento = new Image();
        imageEvento.src = `${imageUrl}`
        imageEvento.onload = function(){
            context.drawImage(imageEvento, 165, 95, 60, 40)
        }
      }
      })
    })
  }

function deleteOng(id) {
    fetch(`https://backend-ajuda-certeria-production.up.railway.app/eventos/${id}`, {
      method: "DELETE"
    })
    setTimeout(getEventos, 100)
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
  
      setTimeout(getEventos, 100)
    });
}

const formEl = document.getElementById("form-api")
enviarFormularioParaAPI(formEl)

getEventos()
