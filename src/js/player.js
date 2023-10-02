import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import { setCurrentTrack } from './localStorage.js'
import { pauseBtn, playBtn } from './main.js'
import { timeFormatter } from './misc.js'
import { clearSessionShuffle, setShuffledPlaylist } from './sessionStorage.js'
import { tracksItems } from './trackArray.js'

const trackLine = document.querySelector('.track-line')
const trackDuration = document.querySelector('.whole-time')
const currentSongTime = document.querySelector('.current-time')
const trackName = document.querySelector('.info-name')
const trackArtist = document.querySelector('.info-artist')
const loopBtn = document.querySelector('.track-loop')
const shuffleBtn = document.querySelector('.track-random')
let isShuffle, isLoop = false

export let currentTrack = 0

// Создание аудио
export let wavesurfer = WaveSurfer.create({
    container: trackLine,
    waveColor: '#b0bec5',
    progressColor: '#455a64',
    url: tracksItems[0].audio,
    height: '70',
    barWidth: '2',
    barGap: '3',
    barRadius: '2',
    barHeight: '0.6',
    cursorWidth: '2',
    dragToSeek: true
})
// Помещение данных 1ого трека в блоки
wavesurfer.on('ready', () => {
    trackDuration.innerText = timeFormatter(wavesurfer.getDuration())
    trackName.innerText = tracksItems[0].name
    trackArtist.innerText = tracksItems[0].artist
})
wavesurfer.on('timeupdate', (currentTime) => currentSongTime.innerText = timeFormatter(currentTime))

// Изменение трека в плеере
export function changeAudioInPlayer(item, title = 'tracks') {

    wavesurfer.load(item.audio)
    console.log(item, 'item')
    wavesurfer.on('ready', () => {
        trackDuration.innerText = timeFormatter(wavesurfer.getDuration())
        wavesurfer.play()
        playBtn.style.display = `none`
        pauseBtn.style.display = `flex`
        trackName.innerText = item.name
        trackArtist.innerText = item.artist
        currentTrack = JSON.parse(localStorage.getItem('currentTrack'))
    })

    wavesurfer.on('timeupdate', (currentTime) => currentSongTime.innerText = timeFormatter(currentTime))
}

const sliderEl = document.querySelector(".volume")
sliderEl.oninput = (e) => {
    volumeBarOnChange(e)
    wavesurfer.setVolume(e.target.value)
}



function volumeBarOnChange(e) {
    const tempSliderValue = e.target.value
    const progress = (tempSliderValue / sliderEl.max) * 100
    sliderEl.style.background =
        `linear-gradient(to right, var(--dark-grey600) ${progress}%, #ccc ${progress}%)`
}

export function initVolume() {
    const sliderEl = document.querySelector('.volume')
    const tempSliderValue = sliderEl.value
    const progress = (tempSliderValue / sliderEl.max) * 100
    sliderEl.style.background =
        `linear-gradient(to right, var(--dark-grey600) ${progress}%, #ccc ${progress}%)`
}



wavesurfer.on('finish', () => nextTrack('tracks'))

export function nextTrack(storageTitle) {

    let tracks = JSON.parse(localStorage.getItem(`${storageTitle}`))
    // При флаге shuffle достает треки из sessionStorage
    // Если их там нет создает плейлист
    if (isShuffle) {
        if (sessionStorage.getItem('shuffle')) {
            tracks = JSON.parse(sessionStorage.getItem('shuffle'))
        } else {
            let shuffledTracks = tracks.sort(() => Math.random() - 0.5)
            setShuffledPlaylist(shuffledTracks)
            tracks = shuffledTracks
        }
        if (!isLoop) {
            if (currentTrack < tracks.length - 1) {
                currentTrack++
                setCurrentTrack(currentTrack)
            }
            else if (tracks.length - 1 === currentTrack) {
                currentTrack = 0
                setCurrentTrack(currentTrack)
            }
        }
        console.log(currentTrack, 'current')
        changeAudioInPlayer(tracks[currentTrack], 'shuffle')

    }
    else {
        clearSessionShuffle()
        tracks = JSON.parse(localStorage.getItem(`${storageTitle}`))
        if (!isLoop) {
            if (currentTrack < tracks.length - 1) {
                currentTrack++
                setCurrentTrack(currentTrack)
            }
            else if (tracks.length - 1 === currentTrack) {
                currentTrack = 0
                setCurrentTrack(currentTrack)
            }
        }
        console.log(currentTrack, 'current')
        changeAudioInPlayer(tracks[currentTrack], storageTitle)
    }
}

export function prevTrack(storageTitle) {
    let tracks = JSON.parse(localStorage.getItem(`${storageTitle}`))
    if (isShuffle) {
        if (sessionStorage.getItem('shuffle')) {
            tracks = JSON.parse(sessionStorage.getItem('shuffle'))
        } else {
            let shuffledTracks = tracks.sort(() => Math.random() - 0.5)
            setShuffledPlaylist(shuffledTracks)
            tracks = shuffledTracks
        }
        if (!isLoop) {
            if (currentTrack === 0) {
                currentTrack = tracks.length - 1
                setCurrentTrack(currentTrack)
            }
            else if (currentTrack > 0) {
                currentTrack--
                setCurrentTrack(currentTrack)
            }
        }

    } else {
        clearSessionShuffle()
        tracks = JSON.parse(localStorage.getItem(`${storageTitle}`))
        if (!isLoop) {
            if (currentTrack === 0) {
                currentTrack = tracks.length - 1
                setCurrentTrack(currentTrack)
            }
            else if (currentTrack > 0) {
                currentTrack--
                setCurrentTrack(currentTrack)
            }
        }
        changeAudioInPlayer(tracks[currentTrack], storageTitle)
    }
}

loopBtn.onclick = () => {
    if (!loopBtn.classList.contains('active-loop')) {
        loopBtn.classList.add('active-loop')
        isLoop = true
    } else {
        loopBtn.classList.remove('active-loop')
        isLoop = false
    }
}

shuffleBtn.onclick = () => {
    if (!shuffleBtn.classList.contains('random-active')) {
        shuffleBtn.classList.add('random-active')
        isShuffle = true
    } else {
        shuffleBtn.classList.remove('random-active')
        isShuffle = false
    }
}
