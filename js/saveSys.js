// watchlist save system

export function hasSavedFilm(imdbID) {
    const arr = JSON.parse(localStorage.getItem("watchlist") || "[]")
    return arr.includes(imdbID)
}

 export function saveFilm(imdbID) {
    if (!hasSavedFilm(imdbID)) {
        const arr = JSON.parse(localStorage.getItem("watchlist") || "[]")
        arr.push(imdbID)
        localStorage.setItem("watchlist", JSON.stringify(arr))
    }
}

export function removeFilm(imdbID) {
    if(hasSavedFilm(imdbID)){
        const arr = JSON.parse(localStorage.getItem("watchlist"))
        arr.splice(arr.indexOf(imdbID), 1)
        localStorage.setItem("watchlist", JSON.stringify(arr))
    }
}