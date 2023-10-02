import { pauseBtn, playBtn } from "./main.js"
import { changeAudioInPlayer } from "./player.js"
import { openTracks } from "./playlists.js"
import { tracksItems } from "./trackArray.js"

export let playlistTitle

// Проверка на наличие треков в хранилище
export function checkStorage(arr = tracksItems) {
    if (!localStorage.getItem('tracks')) {
        const storagedTracks = JSON.stringify(arr)
        localStorage.setItem('tracks', storagedTracks)
        arr.forEach(item => renderItemsFromStorage(item))

    } else if (localStorage.getItem('tracks')) {
        loadTracksFromStorage()
    }
}

// Загрузка треков из хранилища
function loadTracksFromStorage() {
    const items = JSON.parse(localStorage.getItem('tracks'))
    items.forEach(item => {
        renderItemsFromStorage(item, items)
    })
}

// Отрисвока массива данных
function renderItemsFromStorage(item, arr) {
    const tracksList = document.querySelector('.tracks')
    const newTrack = document.createElement('div')
    newTrack.classList.add('track')
    newTrack.innerHTML = `
            <div class="track-item" dataset-id="${item.id}">
                <h2 class="track-name">${item.name}</h2>    
                <h3 class="track-artist">${item.artist}</h3>    
            </div>
            <span class="underline"></span>`
    newTrack.onclick = () => {
        changeAudioInPlayer(item)
        setCurrentPlaylist()
        setCurrentTrackFromClick(arr, item)
        pauseBtn.style.display = `none`
        playBtn.style.display = `flex`

    }
    tracksList.append(newTrack)
}


// Playlist
export function setPlaylistFromForm(title, array) {
    if (!localStorage.getItem(`'${title}'`)) {
        // Помезение плейлиста с треками в хранилище
        const items = JSON.stringify(array)
        localStorage.setItem(`${title}`, items)
        // Помещение названия плейлситов в хранилище
        if (localStorage.getItem('playlists')) {
            const playlistName = JSON.parse(localStorage.getItem('playlists'))
            localStorage.setItem('playlists', JSON.stringify([...playlistName, title]))
        } else localStorage.setItem('playlists', JSON.stringify([title]))
    } else return
}

export function renederPlaylists() {
    if (localStorage.getItem('playlists')) {
        const playlists = JSON.parse(localStorage.getItem('playlists'))
        const createdPlaylists = document.querySelector('.created-playlists')

        createdPlaylists.innerHTML = ``
        playlists.forEach(item => {
            const playlistBlock = document.createElement('div')
            playlistBlock.classList.add('playlist-item')
            playlistBlock.innerHTML = `
            <h2 class="playlist-title">${item}</h2>
            <span class="underline"></span>`

            playlistBlock.onclick = () => {
                getPlaylistsTrack(item)
                openTracks()
            }
            createdPlaylists.append(playlistBlock)
        })
    } else return
}

function getPlaylistsTrack(title) {
    const playlistTracks = document.querySelector('.playlist-tracks')
    const tracks = JSON.parse(localStorage.getItem(`${title}`))
    playlistTracks.innerHTML = ``
    tracks.forEach(item => {
        renderTracksFromPlaylist(item, title, tracks)
    })
}

function renderTracksFromPlaylist(item, title, arr) {
    const playlistTracks = document.querySelector('.playlist-tracks')
    const newTrack = document.createElement('div')
    newTrack.classList.add('track')
    newTrack.innerHTML = `
            <div class="track-item" dataset-id="${item.id}">
                <h2 class="track-name">${item.name}</h2>    
                <h3 class="track-artist">${item.artist}</h3>    
            </div>
            <span class="underline"></span>`
    newTrack.onclick = () => {
        changeAudioInPlayer(item, title)
        setCurrentPlaylist(title)
        setCurrentTrackFromClick(arr, item)
        pauseBtn.style.display = `none`
        playBtn.style.display = `flex`
    }
    playlistTracks.append(newTrack)
}

// хранение переменных между файлами через localstorage
function setCurrentPlaylist(item = 'tracks') {
    localStorage.setItem('currentPlaylist', JSON.stringify(item))
}
export function defaultPlaylist() {
    localStorage.setItem('currentPlaylist', JSON.stringify('tracks'))
    return JSON.parse(localStorage.getItem('currentPlaylist'))
}
export function getCurrentPlaylist() {
    if (localStorage.getItem('currentPlaylist')) {
        const current = JSON.parse(localStorage.getItem('currentPlaylist'))
        return current
    } else return 'tracks'
}

function setCurrentTrackFromClick(arr, item) {
    localStorage.setItem('currentTrack', JSON.stringify(arr.findIndex(el => el.audio === item.audio)))
}
export function setCurrentTrack(current) {
    localStorage.setItem('currentTrack', JSON.stringify(current))
}

// Функция обновления всех треков при добавлении нового
export function addNewTrackToStorage(track) {
    const storagedItems = JSON.parse(localStorage.getItem('tracks'))

    localStorage.setItem('tracks', JSON.stringify([...storagedItems, track]))
}