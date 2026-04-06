import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';
import { dessinerEssence } from './essence.js';
import { dessinerMaison } from './maison.js';
import { dessinerPiscine } from './piscine.js';

// 1. INITIALISATION DU CANVAS (RÉSOLUTION FIXE)
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 600;

// On définit la surface de dessin interne
canvas.width = WIDTH;
canvas.height = HEIGHT;

var prix_sp95 = "---";

/* Mise à jour des prix */
async function mettre_a_jour_prix() {
    prix_sp95 = await recupererPrix();
}

mettre_a_jour_prix();
setInterval(mettre_a_jour_prix, 3600000);

/* Boucle de rendu principale */
function boucle_principale() {
    // On nettoie tout l'écran (fond noir)
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 2. DESSIN DES MODULES (Sans cadre autour)
    // Ils sont placés dans ton espace virtuel de 1200x600
    dessinerEssence(ctx, 0, 0, prix_sp95);
    dessinerMeteo(ctx, 200, 0);
    dessinerHorloge(ctx, 400, 0);
    dessinerMaison(ctx, 600, 0, 200, 200);
    dessinerPiscine(ctx, 800, 0, 200, 200);
    requestAnimationFrame(boucle_principale);
}

boucle_principale();