// --- FICHIER maison.js (AUTONOME : RECHERCHE + DESSIN) ---

// 1. CONFIGURATION DU SVG ORIGINAL
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

// 2. GESTION DES DONNÉES (Stockées localement dans le module)
let donneesHabitat = { salon: "--", chambre: "--" };

export async function mettreAJourHabitat() {
    const urlAPI = "https://api.thingspeak.com/channels/2787477/feeds/last.json";
    try {
        const reponse = await fetch(urlAPI);
        const f = await reponse.json();
        donneesHabitat.salon = f.field2 || "--";   // Field 2 = Salon
        donneesHabitat.chambre = f.field7 || "--"; // Field 7 = Chambre
    } catch (e) {
        console.error("Erreur IoT Maison:", e);
    }
}

// Lancer une mise à jour immédiate et toutes les 30 secondes
mettreAJourHabitat();
setInterval(mettreAJourHabitat, 30000);

// 3. FONCTION DE DESSIN
export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // A. CADRE BLANC
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    if (!imgMaison.complete) return;

    // B. ICÔNE NÉON (Positionnée en haut)
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    const iconeSize = 80;
    ctx.drawImage(imgMaison, x + (w/2 - iconeSize/2), y + 15, iconeSize, iconeSize);
    ctx.restore();

    // C. AFFICHAGE DES VRAIES VALEURS JSON
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Salon
    ctx.font = "bold 18px Arial";
    ctx.fillText("SALON: " + donneesHabitat.salon + "°", x + 100, y + 130);
    
    // Chambre
    ctx.font = "18px Arial";
    ctx.fillText("CHAMBRE: " + donneesHabitat.chambre + "°", x + 100, y + 165);
    
    ctx.restore();
}