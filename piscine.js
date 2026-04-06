// --- FICHIER piscine.js (ONDES SINUSOÏDALES 21 POINTS) ---

const svgPiscineData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24">
        <g fill="none" stroke="#00ffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 1 10 L 1.9 9.6 L 2.8 9.3 L 3.7 9.4 L 4.6 9.8 L 5.5 10.3 L 6.4 10.7 L 7.3 10.7 L 8.2 10.3 L 9.1 9.8 L 10 9.4 L 10.9 9.3 L 11.8 9.6 L 12.7 10 L 13.6 10.4 L 14.5 10.7 L 15.4 10.7 L 16.3 10.4 L 17.2 10 L 18.1 9.6 L 19 9.3" />
            <path d="M 1 15 L 1.9 14.6 L 2.8 14.3 L 3.7 14.4 L 4.6 14.8 L 5.5 15.3 L 6.4 15.7 L 7.3 15.7 L 8.2 15.3 L 9.1 14.8 L 10 14.4 L 10.9 14.3 L 11.8 14.6 L 12.7 15 L 13.6 15.4 L 14.5 15.7 L 15.4 15.7 L 16.3 15.4 L 17.2 15 L 18.1 14.6 L 19 14.3" />
        </g>
    </svg>`;

const imgPiscine = new Image();
const svgBlob = new Blob([svgPiscineData], {type: 'image/svg+xml;charset=utf-8'});
imgPiscine.src = URL.createObjectURL(svgBlob);

// Variables pour stocker les 3 données
let tempAir = "--";
let tempEau = "--";
let niveauEau = "--";

export async function majDonneesPiscine() {
    const channelID = "2787477";
    try {
        // On récupère Air (Field 6), Eau (Field 4), Niveau (Field 5)
        const [resAir, resEau, resNiv] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/2787477/fields/1/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/4/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`)
        ]);

        const dataAir = await resAir.json();
        const dataEau = await resEau.json();
        const dataNiv = await resNiv.json();

        if (dataAir.field6 !== null) tempAir = dataAir.field6;
        if (dataEau.field4 !== null) tempEau = dataEau.field4;
        if (dataNiv.field5 !== null) niveauEau = dataNiv.field5;

        console.log("Données Piscine (Air/Eau/Niveau) OK");
    } catch (e) {
        console.error("Erreur Fetch Piscine:", e);
    }
}

majDonneesPiscine();
setInterval(majDonneesPiscine, 30000);

export function dessinerPiscine(ctx, x, y, w = 200, h = 200) {
    // A. CADRE
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    if (!imgPiscine.complete) return;

    // B. ICÔNE VAGUES
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";
    const size = 80;
    ctx.drawImage(imgPiscine, x + (w/2 - size/2), y + 10, size, size);
    ctx.restore();

    // C. TEXTES (3 données affichées verticalement)
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Air Extérieur
    ctx.font = "16px Arial";
    ctx.fillText("AIR EXT : " + tempAir + "°", x + 100, y + 115);
    
    // Eau Piscine (en gras car c'est le sujet principal)
    ctx.font = "bold 18px Arial";
    ctx.fillText("EAU : " + tempEau + "°", x + 100, y + 145);
    
    // Niveau
    ctx.font = "16px Arial";
    ctx.fillText("NIVEAU : " + niveauEau, x + 100, y + 175);
    
    ctx.restore();
}