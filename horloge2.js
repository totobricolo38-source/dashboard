// --- FICHIER horloge.js ---
import { dessiner_icone } from './utils.js';

export function dessinerHorloge2(ctx, x, y) {
    const maintenant = new Date();
    const bleuNeon = "#00ffff"; // Ton Cyan

    // 1. LE CADRE (Avec lueur)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = bleuNeon;
    ctx.strokeRect(x, y, 600, 400);
    ctx.restore();

    // 2. L'ICÔNE
    dessiner_icone(ctx, x + 250, y + 40, 100, 100, "horloge.svg");

    // 3. TEXTE (Heure & Date)
    ctx.save();
    ctx.textAlign = "center";
    
    // --- LA CORRECTION EST ICI ---
    ctx.shadowBlur = 15;
    ctx.shadowColor = bleuNeon;
    ctx.fillStyle = bleuNeon; // On met le texte en BLEU CYAN pour le faire briller
    
    // L'HEURE (Format HH:MM)
    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    
    ctx.font = "bold 120px Arial";
    ctx.fillText(`${heures}:${minutes}`, x + 300, y + 250);

    // LA DATE (Un peu plus discrète mais toujours néon)
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', options).toUpperCase();
    
    ctx.font = "bold 25px Arial";
    ctx.letterSpacing = "4px";
    ctx.fillText(dateStr, x + 300, y + 330);

    ctx.restore();
}