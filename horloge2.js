// --- FICHIER horloge.js ---
import { dessiner_icone } from './utils.js';

/**
 * Rendu du module Horloge Géant (600x400)
 */
export function dessinerHorloge2(ctx, x, y) {
    const maintenant = new Date();
    
    // 1. LE CADRE GÉANT (Style Néon)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3; // Un peu plus épais pour la taille
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffff";
    ctx.strokeRect(x, y, 600, 400);
    ctx.restore();

    // 2. L'ICÔNE (Positionnée en haut à gauche ou centrée)
    dessiner_icone(ctx, x + 260, y + 30, 80, 80, "horloge.svg");

    // 3. TEXTE (Heure / Date)
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ffff";

    // HEURE (Trés grand au centre)
    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
    
    ctx.font = "bold 100px Arial";
    ctx.fillText(`${heures}:${minutes}`, x + 300, y + 220);
    
    // SECONDES (Plus petit, à côté ou en dessous)
    ctx.font = "bold 40px Arial";
    ctx.fillText(secondes, x + 300, y + 270);

    // DATE (En bas)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', options).toUpperCase();
    
    ctx.font = "24px Arial";
    ctx.letterSpacing = "2px"; // Pour le style cockpit
    ctx.fillText(dateStr, x + 300, y + 350);

    ctx.restore();
}