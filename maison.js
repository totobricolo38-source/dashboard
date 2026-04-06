// --- FICHIER maison.js (AUTONOME : DATA + DESSIN) ---

// 1. CONFIGURATION DU SVG (Ton tracé exact avec corps rempli)
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

// 2. RÉCUPÉRATION DES DONNÉES THINGSPEAK
let tempSalon = "--";
let tempChambre = "--";

export async function majDonneesMaison() {
    const urlAPI = "https://api.thingspeak.com/channels/2787477/feeds/last.json";
    try {
        const reponse = await fetch(urlAPI);
        const data = await reponse.json();
        
        // Mappage selon ta configuration :
        tempSalon = data.field2 || "--";   // Field 2 = Salon
        tempChambre = data.field7 || "--"; // Field 7 = Chambre
        
        console.log("Mise à jour Maison OK");
    } catch (e) {
        console.error("Erreur récup data Maison:", e);
    }
}

// Lancement automatique au chargement et toutes les 30 secondes
majDonneesMaison();
setInterval(majDonneesMaison, 30000);

// 3. FONCTION DE RENDU
export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // A. CADRE BLANC
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    if (!imgMaison.complete) return;

    // B. ICÔNE NÉON (Positionnée en haut pour laisser de la place)
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    const size = 80;
    ctx.drawImage(imgMaison, x + (w/2 - size/2), y + 15, size, size);
    ctx.restore();

    // C. AFFICHAGE DES TEMPÉRATURES
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Salon (en gras)
    ctx.font = "bold 18px Arial";
    ctx.fillText("SALON : " + tempSalon + "°", x + 100, y + 130);
    
    // Chambre
    ctx.font = "18px Arial";
    ctx.fillText("CHAMBRE : " + tempChambre + "°", x + 100, y + 165);
    
    ctx.restore();
}