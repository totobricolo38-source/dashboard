import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';

const ctx = document.getElementById('mainCanvas').getContext('2d');

function boucle() {
  ctx.clearRect(0, 0, 1200, 600);
  dessinerMeteo(ctx, 0, 0);   // Bloc 1
  dessinerHorloge(ctx, 200, 0); // Bloc 2
  requestAnimationFrame(boucle);
}
boucle();