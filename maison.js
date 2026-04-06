// --- FICHIER maison.js ---

// 1. Le SVG de la maison (en format texte pour être intégré)
const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g fill="none" stroke="#00ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </g>
    </svg>`;

// 2. Création de l'image à partir du SVG
const imgMaison = new Image();
const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
const url = URL.createObjectURL(svgBlob);
imgMaison.src = url;

/**
 * Dessine le module Maison : un cadre blanc et une icône néon
 * @param {CanvasRenderingContext2D} ctx - Le contexte du canvas
 * @param {number} x - Position X (ex: 600)
 * @param {number} y - Position Y (ex: 0)
 * @param {number} w - Largeur (200)
 * @param {number} h - Hauteur (200)
 */
export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // Sécurité : on ne dessine que si l'image est prête
    if (!imgMaison.complete) return;

    ctx.save();

    // --- A. LE CADRE BLANC ---
    // On le dessine sans néon pour qu'il reste parfaitement net
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // --- B. L'ICÔNE NÉON ---
    ctx.shadowBlur = 20;            // Intensité du halo
    ctx.shadowColor = "#00ffff";    // Couleur du néon (Cyan)
    
    // On ajoute un padding (marge interne) pour que l'icône 
    // ne touche pas les bords du carré blanc
    const padding = 40; 
    const iconeSize = w - (padding * 2);
    
    ctx.drawImage(
        imgMaison, 
        x + padding, 
        y + padding, 
        iconeSize, 
        iconeSize
    );

    ctx.restore();
}