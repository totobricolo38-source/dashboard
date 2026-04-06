import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';
import { dessinerHorloge2 } from './horloge2.js';
import { dessinerEssence } from './essence.js';
import { dessinerMaison } from './maison.js';
import { dessinerPiscine } from './piscine.js';
import { dessinerBatterie } from './batterie.js';
import { dessinerBourse } from './bourse.js';

// 1. INITIALISATION DU CANVAS
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// --- ON A SUPPRIMÉ TOUTE LA LOGIQUE "recupererPrix" ICI ---

/* Boucle de rendu principale */
function boucle_principale() {
    // On nettoie tout l'écran
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 2. DESSIN DES MODULES (Note : dessinerEssence n'a plus besoin du 4ème argument)
    dessinerEssence(ctx, 0, 0); 
    dessinerMeteo(ctx, 200, 0);
    dessinerHorloge(ctx, 400, 0);
    dessinerMaison(ctx, 600, 0, 200, 200);
    dessinerPiscine(ctx, 800, 0, 200, 200);
    dessinerBatterie(ctx, 0, 200, 200, 200);
    dessinerBourse(ctx, 200, 200, 200, 200);
    dessinerHorloge2(ctx,400,200,600,400);
    requestAnimationFrame(boucle_principale);
}

boucle_principale();