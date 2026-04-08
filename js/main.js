
import { dessinerMeteo } from './modules/meteo.js';
import { dessinerHorloge } from './modules/horloge.js';
import { dessinerEssence } from './modules/essence.js';
import { dessinerMaison } from './modules/maison.js';
import { dessinerPiscine } from './modules/piscine.js';
import { dessinerBatterie } from './modules/batterie.js';
import { dessinerBourse } from './modules/bourse.js';
import { dessinerESP32, gererClicESP32 } from './modules/esp32.js';

// 1. INITIALISATION DU CANVAS
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Positions du widget ESP32
const ESP_X = 1000; // Par exemple, à droite de la piscine
const ESP_Y = 0;

// GESTION DU CURSEUR (POINTER)
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseX >= ESP_X && mouseX <= ESP_X + 200 && mouseY >= ESP_Y && mouseY <= ESP_Y + 200) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});

// GESTION DU CLIC
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // On délègue la vérification au module
    gererClicESP32(mouseX, mouseY, ESP_X, ESP_Y);
});


// --- ON A SUPPRIMÉ TOUTE LA LOGIQUE "recupererPrix" ICI ---

/* Boucle de rendu principale */
function boucle_principale() {
    // On nettoie tout l'écran
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 2. DESSIN DES MODULES (Note : dessinerEssence n'a plus besoin du 4ème argument)
    dessinerEssence(ctx, 0, 0); 
    dessinerMeteo(ctx, 200, 0);
    dessinerMaison(ctx, 600, 0, 200, 200);
    dessinerPiscine(ctx, 800, 0, 200, 200);
    dessinerESP32(ctx, ESP_X, ESP_Y);
    dessinerBatterie(ctx, 0, 200, 200, 200);
    dessinerBourse(ctx, 200, 200, 200, 200);
    dessinerHorloge(ctx,400,200,600,400);
    requestAnimationFrame(boucle_principale);
}

boucle_principale();