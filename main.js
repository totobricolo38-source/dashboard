// main.js

// On importe la nouvelle fonction
import { dessinerMeteoDynamique } from './meteo.js';

const canvas = document.getElementById('canvasMeteo');
const ctx = canvas.getContext('2d');

// On lance l'animation
dessinerMeteoDynamique(ctx);