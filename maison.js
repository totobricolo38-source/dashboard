// --- FICHIER maison.js ---

// 1. On définit le SVG "pur" (sans dimensions, juste la viewBox)
const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 26">
        <g fill="#00ffff" stroke="#00ffff" stroke-width="1.2">
            <path d="M4 21V11l6-6 6 6v10z" stroke="none"/>
            <path d="M2 10l8-8 8 8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    </svg>`;

// 2. Préparation de l'image (Blob technique pour le néon)
const imgMaison = new Image();
const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
const url = URL.createObjectURL(svgBlob);
imgMaison.src = url;

// 3. La fonction d'export pour dessiner
// x, y : position dans le canvas (coordonnées 1200x600)
// w, h : taille de dessin voulue (ici 200x200)
export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // On attend que l'image soit chargée avant de dessiner
    if (!imgMaison.complete) return; 

    ctx.save();
    
    // --- L'EFFET NÉON ---
    ctx.shadowBlur = 20;            // Intensité de la lueur
    ctx.shadowColor = "#00ffff";    // Couleur Cyan
    
    // Dessin de l'image à la position et taille demandée
    ctx.drawImage(imgMaison, x, y, w, h);
    
    ctx.restore(); // IMPORTANT : Pour ne pas contaminer les autres modules
}