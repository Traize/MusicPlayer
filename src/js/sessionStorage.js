
export function setShuffledPlaylist(array) {
    sessionStorage.setItem('shuffle', JSON.stringify(array))
}


export function clearSessionShuffle() {
    sessionStorage.removeItem('shuffle')
}