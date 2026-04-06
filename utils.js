// Dictionnaire pour stocker les objets Image et éviter de les recréer sans arrêt
const cacheIcones = {};

// Canvas temporaire unique (réutilisé pour toutes les icônes)
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');

/**
 * Dessine une icône SVG, la colorie en bleu néon et ajoute une lueur diffuse
 * @param {CanvasRenderingContext2D} ctx - Contexte du canvas principal
 * @param {number} x - Position X
 * @param {number} y - Position Y
 * @param {number} w - Largeur
 * @param {number} h - Hauteur
 * @param {string} name - Nom du fichier SVG (ex: "piscine.svg")
 */
export function dessiner_icone(ctx, x, y, w, h, name) {
    // 1. Gestion du cache de l'image
    if (!cacheIcones[name]) {
        cacheIcones[name] = new Image();
        cacheIcones[name].src = "./" + name;
    }

    const img = cacheIcones[name];

    // 2. On ne dessine que si l'image est prête
    if (img.complete && img.naturalWidth !== 0) {
        
        // On ajuste la taille du canvas temporaire à celle demandée
        offCanvas.width = w;
        offCanvas.height = h;
        
        // --- ÉTAPE A : Préparer l'icône colorée sur le canvas invisible ---
        offCtx.clearRect(0, 0, w, h);
        offCtx.drawImage(img, 0, 0, w, h);
        
        // On force la couleur bleu néon sur les pixels de l'image
        offCtx.globalCompositeOperation = 'source-in';
        offCtx.fillStyle = "#00ffff";
        offCtx.fillRect(0, 0, w, h);
        offCtx.globalCompositeOperation = 'source-over'; // Retour au mode normal

        // --- ÉTAPE B : Dessiner sur le canvas principal avec effets ---
        ctx.save();
        
        // Lueur diffuse (Shadow)
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00ffff";
        
        // On dessine le résultat du canvas invisible
        // L'image sera nette car elle est dessinée "proprement" sur le offCanvas avant
        ctx.drawImage(offCanvas, x, y, w, h);
        
        ctx.restore();
    }
}