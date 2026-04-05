import { dessinerCercle } from './meteo.js';

const canvas = document.getElementById('canvasMeteo');
const ctx = canvas.getContext('2d');

// On appelle la fonction qui vient de l'autre fichier
dessinerCercle(ctx);