import { dessinerMeteo } from './modules/meteo.js';
import { dessinerHorloge } from './modules/horloge.js';
import { dessinerEssence } from './modules/essence.js';
import { dessinerMaison } from './modules/maison.js';
import { dessinerPiscine } from './modules/piscine.js';
import { dessinerBatterie } from './modules/batterie.js';
import { dessinerBourse } from './modules/bourse.js';
import { dessinerESP32, gererClicESP32 } from './modules/esp32.js';
import { envoyerOrdre } from './mqtt_manager.js';

// 1. INITIALISATION DU CANVAS
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1200;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ESP_X = 1000; 
const ESP_Y = 0;

// --- LA FONCTION MAGIQUE DE RECALCUL DES COORDONNÉES ---
// Elle gère les bandes vides (haut/bas ou gauche/droite)
function obtenirCoordonneesRecalibrees(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    
    const ratioCanvas = WIDTH / HEIGHT; // 2 (1200/600)
    const ratioFenetre = rect.width / rect.height;

    let echelle, offsetX = 0, offsetY = 0;

    if (ratioFenetre > ratioCanvas) {
        // Bandes vides sur les côtés
        echelle = HEIGHT / rect.height;
        offsetX = (rect.width - (WIDTH / echelle)) / 2;
    } else {
        // Bandes vides en haut et en bas
        echelle = WIDTH / rect.width;
        offsetY = (rect.height - (HEIGHT / echelle)) / 2;
    }

    return {
        x: (clientX - rect.left - offsetX) * echelle,
        y: (clientY - rect.top - offsetY) * echelle
    };
}

// --- GESTION DES INTERACTIONS ---

function traiterInteraction(clientX, clientY) {
    const coords = obtenirCoordonneesRecalibrees(clientX, clientY);
    gererClicESP32(coords.x, coords.y, ESP_X, ESP_Y);
}

canvas.addEventListener('mousedown', (event) => {
    traiterInteraction(event.clientX, event.clientY);
});

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); 
    const touch = event.touches[0];
    traiterInteraction(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('mousemove', (event) => {
    const coords = obtenirCoordonneesRecalibrees(event.clientX, event.clientY);

    // Détection précise sur le dessin 1200x600
    if (coords.x >= ESP_X && coords.x <= ESP_X + 200 && 
        coords.y >= ESP_Y && coords.y <= ESP_Y + 200) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});

setInterval(function() {
    try {
        envoyerOrdre('esp32/led', 'get_status');
    } catch (e) {
        console.log("Erreur synchro:", e);
    }
}, 5000);

/* Boucle de rendu principale */
function boucle_principale() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    dessinerEssence(ctx, 0, 0); 
    dessinerMeteo(ctx, 200, 0);
    dessinerMaison(ctx, 600, 0, 200, 200);
    dessinerPiscine(ctx, 800, 0, 200, 200);
    dessinerESP32(ctx, ESP_X, ESP_Y); 
    dessinerBatterie(ctx, 0, 200, 200, 200);
    dessinerBourse(ctx, 200, 200, 200, 200);
    dessinerHorloge(ctx, 400, 200, 600, 400);
    
    requestAnimationFrame(boucle_principale);
}

boucle_principale();