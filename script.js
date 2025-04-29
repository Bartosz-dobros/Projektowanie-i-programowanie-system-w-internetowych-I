function playTrack(src) {
    const player = document.getElementById("audioPlayer");
    player.src = src;
    player.play();
}
