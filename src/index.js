////Global Vairiables////
let currentMovie

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(movieData => {
    ////Function Wishlist////
        // Function that takes an image for each movie and returns it to the 'movie-list' nav element
    renderMovieImage(movieData)
        // Function that shows the details for the movies in the list.
        // This function is acccessed by clicking movie images. AND it automatically displays the first movie details on loading.
    renderMovieDetails(movieData[0])
        // Function accessed the watched Button. toggles 'watched' or 'unwatched' depending on if watch status is true or false.
    toggleWatched()
        // Function that adds blood drops to the rating
    addBloodDrop()
})

function renderMovieImage(movieData) {
    let movieList = document.querySelector('#movie-list')
    movieData.forEach(movie => {
        let movieImage1 = document.createElement('img')
        movieImage1.src = movie.image
        movieImage1.alt = movie.title
        movieList.appendChild(movieImage1)

        movieImage1.addEventListener('click', () => {
            renderMovieDetails(movie)
        })
    })
}
            

function renderMovieDetails(movie) {
    currentMovie = movie
    //selectors for movie details
    let movieDetails = document.querySelector('#movie-info')
    let movieTitle = document.querySelector('#title')
    let movieYear = document.querySelector('#year-released')
    let movieImage2 = document.querySelector('#detail-image')
    let movieBloodRating = document.querySelector('#amount')
    let movieDescription = document.querySelector('#description')
    let movieWatchedButton = document.querySelector('#watched')
    
    movieTitle.textContent = currentMovie.title
    movieYear.textContent = currentMovie.release_year
    movieImage2.src = currentMovie.image
    movieBloodRating.textContent = currentMovie.blood_amount
    movieDescription.textContent = currentMovie.description

    if (currentMovie.watched === false) {
        movieWatchedButton.textContent = "Unwatched"
    } else if (currentMovie.watched === true) {
        movieWatchedButton.textContent = "Watched"
    } 
}

function toggleWatched() {
    let movieWatchedButton = document.querySelector('#watched')
    movieWatchedButton.addEventListener('click', (e) => {
        if (movieWatchedButton.textContent === "Watched") {
            currentMovie.watched = false
        } else if (movieWatchedButton.textContent === "Unwatched") {
            currentMovie.watched = true
        }
       renderMovieDetails(currentMovie)
    })
}

function addBloodDrop() {
    let bloodForm = document.querySelector('#blood-form')
    bloodForm.addEventListener('submit', (e) => {
        e.preventDefault()

        currentMovie.blood_amount += parseInt(e.target['blood-amount'].value)
        renderMovieDetails(currentMovie)
        bloodForm.reset()
    })
}