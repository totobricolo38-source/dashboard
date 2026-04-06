// --- FICHIER horloge.js ---
import { dessiner_icone } from './utils.js';

/**
 * Rendu du module Horloge Central (600x400)
 */
export function dessinerHorloge2(ctx, x, y) {
    const maintenant = new Date();
    const bleuNeon = "#00ffff"; // Ton Cyan fétiche

    // 1. LE CADRE GÉANT (600x400)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;      // Lueur extérieure
    ctx.shadowColor = bleuNeon;
    ctx.strokeRect(x, y, 600, 400);
    ctx.restore();

    // 2. L'ICÔNE CENTRALE
    // On la place un peu plus haut pour laisser de la place au texte
    dessiner_icone(ctx, x + 250, y + 40, 100, 100, "horloge.svg");

    // 3. TEXTE (Heure & Date)
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    
    // On ajoute de la lueur sur le texte aussi !
    ctx.shadowBlur = 15;
    ctx.shadowColor = bleuNeon;

    // L'HEURE (Format HH:MM)
    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    
    ctx.font = "bold 120px Arial"; // Très gros pour remplir le 600x400
    ctx.fillText(`${heures}:${minutes}`, x + 300, y + 250);

    // LA DATE (En majuscules pour le style cockpit)
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', options).toUpperCase();
    
    ctx.font = "bold 25px Arial";
    ctx.letterSpacing = "4px"; // Espace entre les lettres pour le look "Tech"
    ctx.fillText(dateStr, x + 300, y + 330);

    ctx.restore();
}