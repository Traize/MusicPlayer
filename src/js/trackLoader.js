import { addNewTrackToStorage, checkStorage } from "./localStorage.js"

const uploader = document.querySelector('.uploader')
const trackForm = document.querySelector('.track-form')
const trackList = document.querySelector('.tracks')

// Т.к. я не могу получить доступ к файловой системе через браузер
// загрузка треков работает только если поместить трек в папку к остальным трекам

export function getTrackFromForm() {

    if (uploader.files.length > 0) {
        let audioName = uploader.files[0].name
        const trackName = trackForm.querySelector('.track-name').value
        const trackArtist = trackForm.querySelector('.track-artist').value
        const length = JSON.parse(localStorage.getItem('tracks')).length
        if (trackName === '' || trackArtist === '') {
            alert('В форме есть пустое поле')
        } else {
            let addedTrack = {
                id: length,
                name: trackName,
                artist: trackArtist,
                audio: `./audio/${audioName}`,
            }
            trackList.innerHTML = ``
            addNewTrackToStorage(addedTrack)
            checkStorage()
            trackForm.querySelector('.track-name').value = ''
            trackForm.querySelector('.track-artist').value = ''
            uploader.files = ''
        }
    } else return
}