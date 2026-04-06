// --- FICHIER horloge.js ---

export function dessinerHorloge2(ctx, x, y) {
    const maintenant = new Date();
    const bleuNeon = "#00ffff";
    const w = 600;
    const h = 400;

    // 1. LE CADRE (Blanc avec lueur bleue)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = bleuNeon;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // 2. L'HEURE (Style icône : Bleu sur Bleu)
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = w;
    tempCanvas.height = h;

    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const texteHeure = `${heures}:${minutes}`;

    tempCtx.fillStyle = "white";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.font = "bold 160px Arial";
    tempCtx.fillText(texteHeure, w / 2, h / 2 - 20);

    // Coloration en Cyan (source-in comme tes icônes)
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = bleuNeon;
    tempCtx.fillRect(0, 0, w, h);

    // Dessin final de l'heure avec ombre bleue
    ctx.save();
    ctx.shadowBlur = 25; 
    ctx.shadowColor = bleuNeon;
    ctx.drawImage(tempCanvas, x, y);
    ctx.restore();

    // 3. LA DATE (Blanc pur, sans effet)
    ctx.save();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', options).toUpperCase();
    
    ctx.textAlign = "center";
    ctx.fillStyle = "white"; // Blanc simple
    ctx.font = "bold 35px Arial";
    ctx.letterSpacing = "6px";
    
    // Pas de shadowBlur ici pour que ce soit bien net
    ctx.fillText(dateStr, x + 300, y + 330);
    ctx.restore();
}