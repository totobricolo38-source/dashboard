// --- FICHIER utils.js ---
const cacheIcones = {};
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');

export function dessiner_icone(ctx, x, y, w, h, name, color = "#00ffff") { // Ajoute color ici
    if (!cacheIcones[name]) {
        cacheIcones[name] = new Image();
        cacheIcones[name].src = name; // Retire le "./" en trop si tu passes déjà ./svg/
    }
    const img = cacheIcones[name];
    if (img.complete && img.naturalWidth !== 0) {
        offCanvas.width = w; offCanvas.height = h;
        offCtx.clearRect(0, 0, w, h);
        offCtx.drawImage(img, 0, 0, w, h);
        offCtx.globalCompositeOperation = 'source-in';
        offCtx.fillStyle = color; // <--- CHANGE ICI (au lieu de #00ffff)
        offCtx.fillRect(0, 0, w, h);
        offCtx.globalCompositeOperation = 'source-over';
        ctx.save();
        ctx.shadowBlur = 20; 
        ctx.shadowColor = color; // <--- CHANGE ICI (au lieu de #00ffff)
        ctx.drawImage(offCanvas, x, y, w, h);
        ctx.restore();
    }
}

export function dessiner_widget(ctx, x, y, iconeName, ligne1, ligne2, ligne3) {
    const cheminComplet = `./svg/${iconeName}`;
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.restore();

    dessiner_icone(ctx, x + 60, y + 15, 80, 80, cheminComplet);

    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 18px Arial";
    ctx.fillText(ligne1, x + 100, y + 125);
    ctx.fillText(ligne2, x + 100, y + 155);
    ctx.fillText(ligne3, x + 100, y + 185);
    ctx.restore();
}


export function dessiner_widget_mqtt(ctx, x, y, iconeName, ligne1, ligne2, ligne3, color = "#00ffff") {
    const cheminComplet = `./svg/${iconeName}`;
    
    // 1. Cadre (strokeStyle utilise la couleur reçue)
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.restore();

    // 2. Icône (on passe la couleur à dessiner_icone pour le fillStyle et le shadowColor)
    dessiner_icone(ctx, x + 60, y + 15, 80, 80, cheminComplet, color);

    // 3. Textes (on garde ton style exact)
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