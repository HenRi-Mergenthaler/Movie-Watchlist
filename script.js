const mainEl = document.querySelector("main")
const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const btnLoading = document.getElementById("btn-loading")
const btnText = document.getElementById("btn-text")

const apiKey = "1408e952"

searchBtn.addEventListener("click", e => {
    searchFilm(searchInput.value)
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