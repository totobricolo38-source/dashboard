import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';
import { dessinerEssence, recupererPrix } from './essence.js';

var ctx = document.getElementById('mainCanvas').getContext('2d');
var prix_sp95 = "---";

/* Fonction de mise à jour des données */
async function mettre_a_jour_prix() {
    prix_sp95 = await recupererPrix();
}

/* Initialisation */
mettre_a_jour_prix();
setInterval(mettre_a_jour_prix, 3600000);

/* Boucle de rendu principale */
function boucle_principale() {
    ctx.clearRect(0, 0, 1200, 600);

    dessinerEssence(ctx, 0, 0, prix_sp95);
    dessinerMeteo(ctx, 200, 0);
    dessinerHorloge(ctx, 400, 0);

    requestAnimationFrame(boucle_principale);
}

boucle_principale();