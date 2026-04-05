import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

// Ajuster le canvas à la taille de l'écran
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function boucle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Divisons l'écran en 2 zones par exemple
    const largeurZone = canvas.width / 2;

    // Zone gauche : Météo
    // On passe le contexte, et les coordonnées (x, y, largeur, hauteur)
    dessinerMeteo(ctx, 0, 0, largeurZone, canvas.height);

    // Zone droite : Horloge
    dessinerHorloge(ctx, largeurZone, 0, largeurZone, canvas.height);

    requestAnimationFrame(boucle);
}
boucle();