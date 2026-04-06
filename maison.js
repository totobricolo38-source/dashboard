// --- FICHIER maison.js (SCRUTATION PAR FIELDS) ---

const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24">
    <g 
        fill="#00ffff" 
        stroke="#00ffff" 
        stroke-width="1.5" 
        stroke-linecap="round" 
        stroke-linejoin="round"
    >
        <path d="M 4 21 L 4 11 L 10 5 L 16 11 L 16 21 Z" />

        <path d="M 2 10 L 10 2 L 18 10" fill="none">
            <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="0 0; 0 -1.2; 0 0" 
                dur="2s" 
                repeatCount="indefinite"
                calcMode="spline" 
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                keyTimes="0; 0.5; 1" 
            />
        </path>
    </g>
</svg>`;

const imgMaison = new Image();
const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
const url = URL.createObjectURL(svgBlob);
imgMaison.src = url;

// Variables pour stocker les dernières valeurs valides
let tempSalon = "--";
let tempChambre = "--";

// Fonction de récupération spécifique par Field
export async function majDonneesMaison() {
    const channelID = "2787477";
    
    try {
        // 1. Récupération Salon (Field 2)
        const resSalon = await fetch(`https://api.thingspeak.com/channels/${channelID}/fields/2/last.json`);
        const dataSalon = await resSalon.json();
        if (dataSalon.field2 !== null) tempSalon = dataSalon.field2;

        // 2. Récupération Chambre (Field 7)
        const resChambre = await fetch(`https://api.thingspeak.com/channels/${channelID}/fields/7/last.json`);
        const dataChambre = await resChambre.json();
        if (dataChambre.field7 !== null) tempChambre = dataChambre.field7;

        console.log("Mise à jour Fields 2 & 7 OK");
    } catch (e) {
        console.error("Erreur de scrutation par fields:", e);
    }
}

// Rafraîchissement toutes les 30 secondes
majDonneesMaison();
setInterval(majDonneesMaison, 30000);

export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // A. CADRE
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    if (!imgMaison.complete) return;

    // B. ICÔNE
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    const size = 80;
    ctx.drawImage(imgMaison, x + (w/2 - size/2), y + 15, size, size);
    ctx.restore();

    // C. TEXTES (Toujours à jour grâce à la scrutation individuelle)
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    ctx.font = "bold 18px Arial";
    ctx.fillText("SALON : " + tempSalon + "°", x + 100, y + 130);
    
    ctx.font = "18px Arial";
    ctx.fillText("CHAMBRE : " + tempChambre + "°", x + 100, y + 165);
    
    ctx.restore();
}