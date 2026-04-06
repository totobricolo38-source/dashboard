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

export function dessiner_widget(ctx, x, y, iconeName, ligne1, ligne2, ligne3) {
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.restore();

    dessiner_icone(ctx, x + 60, y + 15, 80, 80, iconeName);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 18px Arial";
    ctx.fillText(ligne1, x + 100, y + 125);
    ctx.fillText(ligne2, x + 100, y + 155);
    ctx.fillText(ligne3, x + 100, y + 185);
    ctx.restore();
}

export async function lire_api(url, chemin) {
    try {
        const response = await fetch(url);
        let data = await response.json();
        if (data.results && data.results[0]) data = data.results[0];

        // Si chemin est une chaîne "a.b", on split. Si c'est un tableau, on le garde tel quel.
        const cles = Array.isArray(chemin) ? chemin : chemin.split('.');
        const valeur = cles.reduce((obj, key) => obj?.[key], data);
        
        return valeur !== undefined && valeur !== null ? valeur : "--";
    } catch (e) {
        console.error("Erreur API:", url, e);
        return "--";
    }
}