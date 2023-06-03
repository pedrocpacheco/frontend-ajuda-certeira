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
                <p class="descricao-evento">${descricao}</p>
                </div>
                `
                ong.innerHTML = userInnerHTML
                cardContainer.appendChild(ong)
            })
        })
    })
}

const formEl = document.getElementById("form-api")

formEl.addEventListener("submit", e =>{
    e.preventDefault();

    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData)

    fetch("https://backend-ajuda-certeria-production.up.railway.app/eventos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    setTimeout(getEventos(), 3000);
})

getEventos()
