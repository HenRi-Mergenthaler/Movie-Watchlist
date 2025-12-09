

async function getWatchlist() {
    const watchlistArr = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const dataArr = []
    watchlistArr.forEach( async e => {
        try {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${searchStr}`)
            const data = await res.json()
            dataArr.push(data)
        } catch (err) {
            console.error(err)
        }
    })
    console.log(dataArr)
}


async function renderResults(data) {
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