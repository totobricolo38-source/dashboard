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
const ESP_X = 1000; 
const ESP_Y = 0;

// --- FONCTION D'INTERACTION UNIFIÉE (PC & MOBILE) ---
function traiterInteraction(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    
    // Calcul qui prend en compte l'étirement (scaling) du canvas pour mobile/écrans HD
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    // On délègue le clic au module ESP32
    gererClicESP32(x, y, ESP_X, ESP_Y);
}

// 1. Écouteur pour la SOURIS (Clic standard)
canvas.addEventListener('mousedown', (event) => {
    traiterInteraction(event.clientX, event.clientY);
});

// 2. Écouteur pour le TOUCHER (Doigt sur mobile)
canvas.addEventListener('touchstart', (event) => {
    // Empêche le défilement de la page quand on touche le widget
    event.preventDefault(); 
    const touch = event.touches[0];
    traiterInteraction(touch.clientX, touch.clientY);
}, { passive: false });

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    
    // 1. Calculer la position REELLE de la souris par rapport au bord du canvas
    const xSurCanvas = event.clientX - rect.left;
    const ySurCanvas = event.clientY - rect.top;

    // 2. Ajuster en fonction du redimensionnement (le ratio)
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const mouseX = xSurCanvas * scaleX;
    const mouseY = ySurCanvas * scaleY;

    // 3. Test de collision (Le widget fait 200x200)
    if (mouseX >= ESP_X && mouseX <= ESP_X + 200 && 
        mouseY >= ESP_Y && mouseY <= ESP_Y + 200) {
        canvas.style.cursor = "pointer";
    } else {
        canvas.style.cursor = "default";
    }
});

// On demande le statut à l'ESP32 toutes les 5 secondes
// Cela synchronise toutes les pages ouvertes sans recharger le navigateur
setInterval(() => {
    import('./mqtt_manager.js').then(module => {
        module.envoyerOrdre('esp32/led', 'get_status');
        console.log("🔄 Synchro automatique : demande de statut envoyée");
    });
}, 5000);

/* Boucle de rendu principale */
function boucle_principale() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    dessinerEssence(ctx, 0, 0); 
    dessinerMeteo(ctx, 200, 0);
    dessinerMaison(ctx, 600, 0, 200, 200);
    dessinerPiscine(ctx, 800, 0, 200, 200);
    dessinerESP32(ctx, ESP_X, ESP_Y); // Utilise les variables ESP_X et ESP_Y
    dessinerBatterie(ctx, 0, 200, 200, 200);
    dessinerBourse(ctx, 200, 200, 200, 200);
    dessinerHorloge(ctx, 400, 200, 600, 400);
    requestAnimationFrame(boucle_principale);
}

boucle_principale();

