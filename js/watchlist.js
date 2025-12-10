import { hasSavedFilm, removeFilm, saveFilm } from "./saveSys.js"

const mainEl = document.querySelector("main")
const apiKey = "1408e952"

document.addEventListener("click", e => {
    if(e.target.closest(".remove-button")) {
        const btn = e.target.closest(".remove-button")
        removeFilm(btn.dataset.imdbid)
        getWatchlist()
    }
})

getWatchlist()
async function getWatchlist() {
    mainEl.innerHTML = `<svg width="100px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>`
    const watchlistArr = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const dataArr = []
    for (const e of watchlistArr) {
        try {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${e}`)
            const data = await res.json()
            dataArr.push(data)
        } catch (err) {
            console.error(err)
        }
    }
    renderResults(dataArr)
}


function renderResults(data) {
    let htmlSnp = ""
    if(data.length > 0) {
        data.forEach((item) => {
            htmlSnp += `
            <div class="film-item-div">
                <img class="film-image"src="${item.Poster}" alt="">
                <div class="film-item-div-text">
                    <div class="film-tite-div">
                        <h3>${item.Title}</h3>
                        <img class="star" src="imgs/star.png" alt="">
                        <p>${item.Ratings?.[0]?.Value || "0.0/10"}</p>
                    </div>
                    <p>${item.Runtime}</p>
                    <p class="film-itens-details">${item.Genre}</p>
                    <button data-imdbid="${item.imdbID}" class="film-itens-details remove-button"><strong>Remove</strong></button>
                    <p class="film-description">${item.Plot}</p>
                </div>
            </div>
            `
        })
    } else {
        htmlSnp = `        
        <div class="start-exploring-msg">
            <p>Your watchlist is looking a little empty...</p>
            <div class="exploring-msg-div">
                <img src="/imgs/cruz.png" alt="">
                <a href="/index.html">Let’s add some movies!</a>
            </div>
        </div>`
    }
    mainEl.style.justifyContent = "start"
    mainEl.innerHTML = htmlSnp
}