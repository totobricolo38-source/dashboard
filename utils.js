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

/**
 * Récupère une donnée JSON depuis n'importe quel lien
 * @param {string} url - Le lien complet de l'API
 * @param {string} champ - Le nom de la clé à extraire (ex: "field1" ou "e10_prix")
 * @returns {Promise<any>} - La valeur ou "--"
 */
export async function lire_api(url, champ) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Si c'est du ThingSpeak (format classique)
        if (data[champ] !== undefined) return data[champ];
        
        // Si c'est l'API Essence (format OpenData avec results[0])
        if (data.results && data.results[0] && data.results[0][champ] !== undefined) {
            return data.results[0][champ];
        }

        return "--";
    } catch (e) {
        console.error("Erreur lecture API:", url, e);
        return "--";
    }
}