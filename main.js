import { dessinerMeteo } from './meteo.js';
import { dessinerHorloge } from './horloge.js';

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

function boucle() {
    // On ne touche plus à canvas.width ici pour garder le 1200x600
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bloc 1 : Météo à (50, 50)
    dessinerMeteo(ctx, 50, 50);

    // Bloc 2 : Horloge à côté à (300, 50)
    // On passe juste x=300 et y=50
    if (typeof dessinerHorloge === 'function') {
        dessinerHorloge(ctx, 300, 50);
    }

    requestAnimationFrame(boucle);
}
boucle();