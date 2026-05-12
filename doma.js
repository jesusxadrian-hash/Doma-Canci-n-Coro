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
    { seg: 118.80, text: "debo domar tu corazón" }
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

    // 1. Buscamos la frase actual en el arreglo
    let fraseEncontrada = infoCancion.find((item, index) => {
        let siguiente = infoCancion[index + 1];
        return tiempoActual >= item.seg && (!siguiente || tiempoActual < siguiente.seg);
    });

    // 2. Solo actualizamos si realmente hay una frase nueva y no es la que ya está puesta
    if (fraseEncontrada && lyricsDisplay.innerText !== fraseEncontrada.text) {
        // Quitamos cualquier animación rara y ponemos el texto de golpe
        lyricsDisplay.style.transition = "none"; 
        lyricsDisplay.innerText = fraseEncontrada.text;
        lyricsDisplay.style.opacity = 1;
    }

    // 3. CORTE FINAL Y SEGURIDAD
    // Si pasamos de los 120 segundos, forzamos que se quede el mensaje final
    if (tiempoActual >= 120.00) {
        lyricsDisplay.innerText = "Gracias por cantar, bañate por favor";
        lyricsDisplay.style.opacity = 1;
    }

    // Detenemos la música un poco después para que dé tiempo de leer
    if (tiempoActual >= 125.00) {
        track.pause();
        playBtn.innerText = "REPLAY";
    }
});
