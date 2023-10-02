import { tracksItems } from "./trackArray.js"
import { wavesurfer, initVolume, nextTrack, prevTrack } from "./player.js"
import { checkStorage, defaultPlaylist, getCurrentPlaylist, renederPlaylists } from "./localStorage.js"
import { loadItems } from "./playlists.js"
import { getTrackFromForm } from "./trackLoader.js"

export const playBtn = document.querySelector('.play')
export const pauseBtn = document.querySelector('.pause')

const tracksList = document.querySelector('.track-list')
const tracksTab = document.querySelector('.tracks-tab')
const playlistsTab = document.querySelector('.playlists-tab')
const playlists = document.querySelector('.playlists')
const next = document.querySelector('.next')
const prev = document.querySelector('.previous')
const createBtn = document.querySelector('.create-playlist')
const createWrapper = document.querySelector('.create-wrapper')
const modal = document.querySelectorAll('.modal')
const upload = document.querySelector('.upload-track')
let currentPlaylist = defaultPlaylist()
const uploadModal = document.querySelector('.upload-wrapper')
const trackForm = document.querySelector('.track-form')

window.onload = () => initVolume()
checkStorage()


playBtn.onclick = () => {
    wavesurfer.play()
    playBtn.style.display = `none`
    pauseBtn.style.display = `flex`
}

pauseBtn.onclick = () => {
    wavesurfer.pause()
    pauseBtn.style.display = `none`
    playBtn.style.display = `flex`
}

tracksTab.onclick = () => {
    tracksTab.classList.add('active-tab')
    playlistsTab.classList.remove('active-tab')
    tracksList.style.display = 'flex'
    playlists.style.display = 'none'
}

playlistsTab.onclick = () => {
    playlistsTab.classList.add('active-tab')
    tracksTab.classList.remove('active-tab')
    tracksList.style.display = 'none'
    playlists.style.display = 'flex'
    renederPlaylists()
}

next.onclick = () => {
    currentPlaylist = getCurrentPlaylist()
    nextTrack(currentPlaylist)
}
prev.onclick = () => {
    currentPlaylist = getCurrentPlaylist()
    prevTrack(currentPlaylist)
}



createBtn.onclick = () => {
    const itemsWindow = document.querySelector('.choose-tracks')
    itemsWindow.innerHTML = ``
    loadItems()
    createWrapper.style.display = 'flex'
}

upload.onclick = () => {
    uploadModal.style.display = 'flex'
}

createWrapper.onclick = () => createWrapper.style.display = 'none'
uploadModal.onclick = () => uploadModal.style.display = 'none'


modal.forEach(item => item.onclick = (e) => e.stopPropagation())

trackForm.onsubmit = (e) => {
    e.preventDefault()
    getTrackFromForm()
    uploadModal.style.display = 'none'
}