API_KEY = XXXXXXXX

const app = document.getElementById('root')
const container = document.getElementById('main')

// Create HTML templates
const cardTemplate = 
`<div class="card">
    <img src="[url]">
        <h3>[parsedDate]</h3>
        <div class="headline">
            <h2>[headline]</h2>
            <button id="[date]" class="bi bi-bookmark-heart-fill [liked]" alt="Like" onclick="handleLike(this.id)"></button>
        </div>
        <p>[caption]</p>
    </div>`
const more = '<button id="more" class="bi bi-plus-circle-fill" alt="Show more" onclick="getMore()"></button>'

function init(){
    if (!localStorage.likes){
        localStorage.setItem('likes', '')
    }
    getImages()
}

// Populate and append image card template to the DOM
function createCard(imageData) {
    var html = cardTemplate
    var url = imageData.url 
    var parsedDate = parseDate(imageData.date) 
    var headline =  imageData.title 
    var date = imageData.date 
    var caption = imageData.explanation 
    var liked = localStorage.likes.includes(date) ? 'liked' : ''

    html = html.replace('[url]', url).replace('[parsedDate]', parsedDate).replace('[headline]', headline).replace('[date]', date).replace('[caption]', caption).replace('[liked]', liked)
    container.insertAdjacentHTML('beforeend', html)
}

// Update likes list in local storage and add or remove liked CSS class
function handleLike(id){
    if (localStorage.likes.includes(id)){
        likes = localStorage.likes.split(' ')
        newLikes = likes.filter(function (value, index, arr) { return value != id })
        localStorage.likes = newLikes.join(' ')
        document.getElementById(id).classList.remove('liked')
    } else {
    localStorage.likes += id + ' '
    document.getElementById(id).classList.add('liked')
    }
}

// Fetch and display 10 random posts from the API (the default)
function getImages(num='10'){
    fetch('https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&count=' + num)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        data.forEach((image) => {
            if (image.media_type != 'video'){
                createCard(image)
            }
            })
            app.insertAdjacentHTML('beforeend', more)
      })
    }

// Fetch and display liked posts
function getLikedImages(){
    likedImages = localStorage.likes.trim().split(' ')
    if (likedImages.length === 1 && likedImages[0] === ''){
        noFavourites = document.createElement('div')
        noFavourites.setAttribute('class', 'card')
        noFavourites.innerText = 'No favourites found. Browse Spacestagram and favourite some posts to see them here.'
        container.appendChild(noFavourites)
    } else {
        likedImages.forEach((date) => {
            if (date !== ''){
                fetch('https://api.nasa.gov/planetary/apod?api_key=' + API_KEY + '&date=' + date)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    createCard(data)
                })
            }
        })
    }
}

// Clear displayed images when switching views
function clearCards() {
    cards = document.querySelectorAll('.card')
    cards.forEach((card) => {
        card.remove()
    })
    if (document.getElementById('more')){
        document.getElementById('more').remove()
    }
}

// Switch to Favourites view
function showFavs(){
    clearCards()
    getLikedImages()
}

// Switch to Random (default) view
function showRandom(){
    clearCards()
    getImages()
}

// Append 10 more random images
function getMore(){
    document.getElementById('more').remove()
    getImages()
}

// Convert YYYY-MM-DD to Month MM, YYYY
function parseDate(date){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[parseInt(date.slice(5, 7)-1)] + ' ' + date.slice(8, 10) + ', ' + date.slice(0, 4)    
}

init()