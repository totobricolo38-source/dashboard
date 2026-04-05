import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';
import { dessinerEssence, recupererPrix } from './essence.js';

const ctx = document.getElementById('mainCanvas').getContext('2d');
let prixSP95 = "---";

// Mise à jour du prix (immédiat + toutes les heures)
const MAJ = async () => prixSP95 = await recupererPrix();
MAJ(); 
setInterval(MAJ, 3600000);

(function boucle() {
  ctx.clearRect(0, 0, 1200, 600);
  
  dessinerEssence(ctx, 0, 0, prixSP95);   // Bloc 1 : Gauche
  dessinerMeteo(ctx, 200, 0);             // Bloc 2 : Milieu
  dessinerHorloge(ctx, 400, 0);           // Bloc 3 : Droite
  
  requestAnimationFrame(boucle);
})();