// --- FICHIER horloge.js ---

export function dessinerHorloge(ctx, x, y) {
    const maintenant = new Date();
    const bleuNeon = "#00ffff";
    const w = 600;
    const h = 400;

    // 1. LE CADRE (Comme tes autres widgets)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = bleuNeon;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // 2. PRÉPARATION DU TEXTE (L'équivalent de ton offCanvas)
    // On utilise un canvas temporaire pour colorier le texte en Cyan
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = w;
    tempCanvas.height = h;

    const heures = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const texteHeure = `${heures}:${minutes}`;

    // On dessine le texte en blanc d'abord sur le canvas temporaire
    tempCtx.fillStyle = "white";
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";
    tempCtx.font = "bold 160px Arial";
    tempCtx.fillText(texteHeure, w / 2, h / 2 - 20);

    // On applique le 'source-in' pour le colorier en Cyan (comme ton icône)
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = bleuNeon;
    tempCtx.fillRect(0, 0, w, h);

    // 3. DESSIN FINAL AVEC OMBRE (Comme la fin de ta fonction dessiner_icone)
    ctx.save();
    ctx.shadowBlur = 25; 
    ctx.shadowColor = bleuNeon;
    
    // On dessine le texte déjà bleu sur le canvas principal
    ctx.drawImage(tempCanvas, x, y);

    // 4. LA DATE (Même logique, plus petit)
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = maintenant.toLocaleDateString('fr-FR', options).toUpperCase();
    
    // On peut réutiliser le tempCanvas pour la date
    tempCtx.globalCompositeOperation = 'source-over'; // Reset
    tempCtx.clearRect(0, 0, w, h);
    tempCtx.font = "bold 35px Arial";
    tempCtx.letterSpacing = "6px";
    tempCtx.fillStyle = "white";
    tempCtx.fillText(dateStr, w / 2, h - 80);
    
    tempCtx.globalCompositeOperation = 'source-in';
    tempCtx.fillStyle = bleuNeon;
    tempCtx.fillRect(0, 0, w, h);
    
    ctx.shadowBlur = 15;
    ctx.drawImage(tempCanvas, x, y);
    
    ctx.restore();
}