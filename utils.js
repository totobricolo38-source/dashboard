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
export async function lire_api(url, chemin) {
    try {
        const response = await fetch(url);
        let data = await response.json();
        
        // Si c'est de l'OpenData (Essence), on va direct dans results[0]
        if (data.results && data.results[0]) data = data.results[0];

        // On suit le chemin point par point (ex: "current.temp")
        const valeur = chemin.split('.').reduce((obj, key) => obj?.[key], data);
        
        return valeur !== undefined && valeur !== null ? valeur : "--";
    } catch (e) {
        console.error("Erreur API:", url, e);
        return "--";
    }
}

export async function lire_bourse(ticker) {
    try {
        // On utilise un proxy pour éviter le blocage CORS de Stooq
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://stooq.com/q/l/?s=${ticker}&f=sd2t2l&e=csv`)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Le contenu CSV est dans data.contents
        // Format reçu : "Symbol,Date,Time,Last" -> "AI.PA,2026-04-06,17:35:02,180.52"
        const lignes = data.contents.split('\n');
        const valeurs = lignes[1].split(',');
        const prix = valeurs[3]; // La 4ème colonne est le dernier cours

        return prix && !isNaN(prix) ? prix : "--";
    } catch (e) {
        console.error("Erreur Bourse:", e);
        return "--";
    }
}