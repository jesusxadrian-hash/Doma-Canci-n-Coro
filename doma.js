const track = document.getElementById('track');
const lyricsDisplay = document.getElementById('lyrics');
const playBtn = document.getElementById('playBtn');

// TIEMPOS RELATIVOS AL CORO (Ajustados al 1:30 que me dijiste)
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
    { seg: 120.00, text: "Gracias por cantar, bañate por favor"}
];

playBtn.addEventListener('click', () => {
    if (track.paused) {
        // Si es la primera vez que damos play, saltamos al coro (segundo 90)
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
    let tiempoActual = track.currentTime;

    // 1. Lógica de las letras
    let frase = infoCancion.find((item, index) => {
        let siguiente = infoCancion[index + 1];
        return tiempoActual >= item.seg && (!siguiente || tiempoActual < siguiente.seg);
    });

    if (frase) {
        if (lyricsDisplay.innerText !== frase.text) {
            lyricsDisplay.innerText = frase.text;
            // Quitamos el opacity momentáneamente si parpadea mucho
            lyricsDisplay.style.opacity = 1; 
        }
    }

    // 2. CORTE FINAL (Dale 4 segundos de gracia después de la última frase)
    if (tiempoActual >= 124) { 
        track.pause();
        // No lo regreses al segundo 90 inmediatamente para que se pueda leer el final
        playBtn.innerText = "REPLAY";
    }
});
