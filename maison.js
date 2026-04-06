// --- FICHIER maison.js (ICÔNE + TEMPÉRATURES) ---

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

/**
 * Dessine le module Maison avec les données IoT
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 * @param {object} s - L'objet station contenant salon_temp et chambre_temp
 */
export function dessinerMaison(ctx, x, y, s, w = 200, h = 200) {
    // 1. DESSIN DU CADRE (Toujours visible)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    if (!imgMaison.complete) return; 

    ctx.save();

    // 2. DESSIN DE L'ICÔNE NÉON (Un peu plus petite et remontée)
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ffff";
    
    const iconeSize = 80; // Taille réduite pour laisser de la place au texte
    const posX = x + (w / 2) - (iconeSize / 2);
    const posY = y + 20; // Placée en haut du carré
    
    ctx.drawImage(imgMaison, posX, posY, iconeSize, iconeSize);
    ctx.restore();

    // 3. AFFICHAGE DES TEMPÉRATURES
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // On vérifie si les données existent, sinon on affiche "--"
    const tempSalon = (s && s.salon_temp) ? s.salon_temp + "°" : "--°";
    const tempChambre = (s && s.chambre_temp) ? s.chambre_temp + "°" : "--°";

    // Texte Salon
    ctx.font = "bold 18px Arial";
    ctx.fillText("SALON : " + tempSalon, x + 100, y + 135);

    // Texte Chambre
    ctx.font = "18px Arial";
    ctx.fillText("CHAMBRE : " + tempChambre, x + 100, y + 170);

    ctx.restore();
}