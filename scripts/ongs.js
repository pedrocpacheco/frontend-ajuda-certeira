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
                const address = u.adress
                
                const userInnerHTML = `
                <div class="image-container">
                    <img src="${imageUrl}" alt="Usuario">
                </div>
                <div class="info">
                    <h3 class="nome">${name}</h2>
                    <span class="email">${email}</span>
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

const formEl = document.getElementById("form-api")

formEl.addEventListener("submit", e =>{
    e.preventDefault();

    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData)

    fetch("https://backend-ajuda-certeria-production.up.railway.app/ongs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    setTimeout(getOngs(), 2000);
})

getOngs()
