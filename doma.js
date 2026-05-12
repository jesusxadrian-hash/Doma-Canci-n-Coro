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

    // Buscamos la frase actual
    let frase = infoCancion.find((item, index) => {
        let siguiente = infoCancion[index + 1];
        // Si el tiempo actual es mayor al de la frase Y (no hay siguiente O es menor al de la siguiente)
        return tiempoActual >= item.seg && (!siguiente || tiempoActual < siguiente.seg);
    });

    if (frase) {
        if (lyricsDisplay.innerText !== frase.text) {
            // Cambiamos el texto directamente sin el delay del setTimeout 
            // para evitar que se quede en blanco ni un milisegundo
            lyricsDisplay.innerText = frase.text;
            lyricsDisplay.style.opacity = 1; 
        }
    }

    // CORTE FINAL: Detenemos la música un poco después del último mensaje
    if (tiempoActual >= 125) { 
        track.pause();
        playBtn.innerText = "REPLAY";
    }
});
