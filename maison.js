// --- FICHIER maison.js (CORPS REMPLI) ---

// 1. Ton SVG avec le remplissage activé pour le corps
const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24">
        <g fill="#00ffff" stroke="#00ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 4 21 L 4 11 L 10 5 L 16 11 L 16 21 Z" />
            
            <path d="M 2 10 L 10 2 L 18 10" fill="none" />
        </g>
    </svg>`;

const imgMaison = new Image();
const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
const url = URL.createObjectURL(svgBlob);
imgMaison.src = url;

export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    if (!imgMaison.complete) return; 

    ctx.save();

    // --- A. LE CADRE BLANC ---
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    // --- B. L'ICÔNE NÉON (TES POINTS ET REMPLISSAGE) ---
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    
    // On centre l'icône dans le carré de 200x200
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