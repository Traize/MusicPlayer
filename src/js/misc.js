

export function timeFormatter(time) {
    let newTime = Math.floor(time)
    const minutes = Math.floor(newTime / 60)
    const seconds = newTime % 60
    newTime = [
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':')

    return newTime
}


