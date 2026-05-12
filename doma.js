const track = document.getElementById('track');
const lyricsDisplay = document.getElementById('lyrics');
const playBtn = document.getElementById('playBtn');

// Tiempos exactos de tu imagen
const infoCancion = [
    { seg: 90.00, text: "misterio de mujeeeer" }, 
    { seg: 93.80, text: "solo será cuestión de tiempo" }, 
    { seg: 97.10, text: "debo interpretar" },
    { seg: 99.40, text: "tus gritos, tus llamadas" },
    { seg: 101.80, text: "tus caricias entrecortadas" },
    { seg: 105.50, text: "y tus arranques de pasión" },
    { seg: 110.60, text: "debo buscar dentro" },
    { seg: 113.50, text: "de tanto desperfecto" },
    { seg: 115.80, text: "la moraleja de este cuento" },
    { seg: 118.80, text: "debo domar tu corazón" },
    { seg: 125.00, text: "Gracias por cantar, bañate por favor" }
];

playBtn.addEventListener('click', () => {
    if (track.paused) {
        // Salto automático al coro
        if (track.currentTime < 90) {
            track.currentTime = 90;
        }
        track.play();
        playBtn.innerText = "PAUSA";
    } else {
        track.pause();
        playBtn.innerText = "REPRODUCIR";
    }
});

track.addEventListener('timeupdate', () => {
    const tiempoActual = track.currentTime;

    // Buscamos la frase que corresponde al tiempo actual
    let fraseActual = "";
    for (let i = 0; i < infoCancion.length; i++) {
        if (tiempoActual >= infoCancion[i].seg) {
            fraseActual = infoCancion[i].text;
        }
    }

    // CRÍTICO: Solo actualiza si la frase es distinta a la que ya se ve.
    // Esto elimina el parpadeo al 100%.
    if (fraseActual !== "" && lyricsDisplay.innerText !== fraseActual) {
        lyricsDisplay.innerText = fraseActual;
    }

    // Corte final para que no siga sonando el resto de la canción
    if (tiempoActual >= 130) { 
        track.pause();
        playBtn.innerText = "REPLAY";
    }
});
