import { renederPlaylists, setPlaylistFromForm } from "./localStorage.js"

const form = document.querySelector('.playlist-form')
const chooseList = document.querySelector('.choose-tracks')
const modalWrapper = document.querySelector('.modal-wrapper')

let checkedTracks = []
let playlistTracks = []

// Cлушатель формы
form.onsubmit = (e) => {
    e.preventDefault()
    createNewPlaylist()
}


export function loadItems() {
    if (localStorage.getItem('tracks')) {
        const tracks = JSON.parse(localStorage.getItem('tracks'))

        tracks.forEach(item => {
            const playlistTrack = document.createElement('div')
            playlistTrack.classList.add('modal-tracks')
            playlistTrack.innerHTML = `
            <div class="modal-item__wrapper">
                <input type="checkbox" class="real-checkbox">
                <div class="modal-track" data-id="${item.id}">
                    <h2 class="track-name">${item.name}</h2>    
                    <h3 class="track-artist">${item.artist}</h3>    
                </div>
            </div>
            <span class="underline"></span>
            `
            chooseList.append(playlistTrack)
        })
    }
}




// Создание нового плейлиста
function createNewPlaylist() {
    checkedTracks = []
    playlistTracks = []
    const tracks = JSON.parse(localStorage.getItem('tracks'))
    const input = document.querySelector('.playlist-name')

    if (!input.value) return
    const checkBoxes = document.querySelectorAll('.real-checkbox')

    // Запись ID выбранных треков в массив
    checkBoxes.forEach(item => {
        if (item.checked) {
            const parent = item.closest('.modal-item__wrapper')
            const track = parent.querySelector('.modal-track')
            let trackObj = { id: track.dataset.id }
            checkedTracks.push(trackObj)
        }
    })

    // При совпадении Id записывает элемент в новый массив
    tracks.forEach(item => {
        for (let i = 0; i < checkedTracks.length; i++) {
            if (item.id === +checkedTracks[i].id) {
                playlistTracks.push(item)
            }
        }
    })

    setPlaylistFromForm(input.value, playlistTracks)
    input.value = ``
    renederPlaylists()
    modalWrapper.style.display = "none"
}

export function openTracks() {
    const playlist = document.querySelector('.created-playlists')
    const tracks = document.querySelector('.playlist-tracks')
    playlist.style.width = '30%'
    tracks.style.width = '65%'
    tracks.style.display = 'flex'
}