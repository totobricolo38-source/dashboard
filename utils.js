// --- FICHIER utils.js ---

const cacheIcones = {};
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');

export function dessiner_icone(ctx, x, y, w, h, name) {
    if (!cacheIcones[name]) {
        cacheIcones[name] = new Image();
        cacheIcones[name].src = "./" + name;
    }
    const img = cacheIcones[name];
    if (img.complete && img.naturalWidth !== 0) {
        offCanvas.width = w; offCanvas.height = h;
        offCtx.clearRect(0, 0, w, h);
        offCtx.drawImage(img, 0, 0, w, h);
        offCtx.globalCompositeOperation = 'source-in';
        offCtx.fillStyle = "#00ffff";
        offCtx.fillRect(0, 0, w, h);
        offCtx.globalCompositeOperation = 'source-over';
        ctx.save();
        ctx.shadowBlur = 20; ctx.shadowColor = "#00ffff";
        ctx.drawImage(offCanvas, x, y, w, h);
        ctx.restore();
    }
}

/**
 * Fonction de Haut Niveau pour dessiner un widget standard 200x200
 */
export function dessiner_widget(ctx, x, y, iconeName, ligne1, ligne2, ligne3) {
    // 1. Cadre blanc
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.restore();

    // 2. Icône centrée
    dessiner_icone(ctx, x + 60, y + 15, 80, 80, iconeName);

    // 3. Les 3 lignes de texte (Gras, 18px, blanc)
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 18px Arial";
    
    ctx.fillText(ligne1, x + 100, y + 125);
    ctx.fillText(ligne2, x + 100, y + 155);
    ctx.fillText(ligne3, x + 100, y + 185);
    
    ctx.restore();
}