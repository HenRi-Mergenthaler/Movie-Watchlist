const mainEl = document.querySelector("main")
const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")

const apiKey = "1408e952"

searchBtn.addEventListener("click", e => {
    searchFilm(searchInput.value)
})

async function searchFilm(searchStr) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchStr}`)
    const data = await res.json()

    renderResults(data)
}

async function renderResults(data) {
    let htmlSnp = ""


    for (const film of data.Search) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${film.imdbID}`)
        const filmData = await res.json()

        htmlSnp += `
        <div class="film-item-div">
            <img class="film-image"src="${filmData.Poster}" alt="">
            <div class="film-item-div-text">
                <div class="film-tite-div">
                    <h3>${filmData.Title}</h3>
                    <img class="star" src="imgs/star.png" alt="">
                    <p>${filmData.Ratings[0].Value}</p>
                </div>
                <p>${filmData.Runtime}</p>
                <p class="film-itens-details">${filmData.Genre}</p>
                <button class="film-itens-details watch-button"><img src="/imgs/cruz.png" alt=""> Watchlist</button>
                <p class="film-description">${filmData.Plot}</p>
            </div>
        </div>
        `
    }

    mainEl.style.justifyContent = "start"
    mainEl.innerHTML = htmlSnp
}