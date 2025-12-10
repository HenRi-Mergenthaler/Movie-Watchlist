import { hasSavedFilm, removeFilm, saveFilm } from "./saveSys.js"

const mainEl = document.querySelector("main")
const searchInput = document.getElementById("search-input")
const btnLoading = document.getElementById("btn-loading")
const btnText = document.getElementById("btn-text")
const btnWatchlist = document.getElementById("btn-watchlist")

const apiKey = "1408e952"

document.addEventListener("click", e => {
    if(e.target.closest("#search-btn")) {
        searchFilm(searchInput.value)
    }
    else if(e.target.closest(".watch-button")) {
        const btn = e.target.closest(".watch-button")
        console.log(btn.dataset.imdbid)
        if(!hasSavedFilm(btn.dataset.imdbid)) {
            saveFilm(btn.dataset.imdbid)
            btn.innerHTML = "<strong>Remove<strong>"
        } else {
            removeFilm(btn.dataset.imdbid)
            btn.innerHTML = `<img src="/imgs/cruz.png" alt=""> Watchlist`
        }
    }
})

async function searchFilm(searchStr) {
    btnLoading.classList.toggle("disabled")
    btnText.classList.toggle("disabled")
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchStr}`)
        const data = await res.json()
        
        await renderResults(data)
    } catch (err) {
        console.error(err)
    } finally {
        btnLoading.classList.toggle("disabled")
        btnText.classList.toggle("disabled")
    }
    
}

async function renderResults(data) {
    //Se nao encontrado nenhum Filme, mostrar msg de erro
    if (data.Response === "False") {
        mainEl.innerHTML = `<div class="start-exploring-msg"><p>Unable to find what you’re looking for.<br> Please try another search.</p></div>`
        return
    }

    let htmlSnp = ""
    for (const film of data.Search) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${film.imdbID}`)
        const filmData = await res.json()

        const btnHtml = hasSavedFilm(filmData.imdbID) ? `<button data-imdbid="${filmData.imdbID}" class="film-itens-details watch-button"><strong>Remove</strong></button>` : `<button data-imdbid="${filmData.imdbID}" class="film-itens-details watch-button"><img src="/imgs/cruz.png" alt=""> Watchlist</button>`
        
        htmlSnp += `
        <div class="film-item-div">
            <img class="film-image"src="${filmData.Poster}" alt="">
            <div class="film-item-div-text">
                <div class="film-tite-div">
                    <h3>${filmData.Title}</h3>
                    <img class="star" src="imgs/star.png" alt="">
                    <p>${filmData.Ratings?.[0]?.Value || "0.0/10"}</p>
                </div>
                <p>${filmData.Runtime}</p>
                <p class="film-itens-details">${filmData.Genre}</p>
                ${btnHtml}
                <p class="film-description">${filmData.Plot}</p>
            </div>
        </div>
        `
    }

    mainEl.style.justifyContent = "start"
    mainEl.innerHTML = htmlSnp
}