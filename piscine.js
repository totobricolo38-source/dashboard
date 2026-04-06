// --- FICHIER piscine.js ---

const imgPiscine = new Image();
imgPiscine.src = "./piscine.svg"; 

let tempAir = "--";
let tempEau = "--";
let niveauEau = "--";

// Création d'un canvas invisible pour colorier l'icône sans affecter le reste
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');

export async function majDonneesPiscine() {
    const channelID = "2787477";
    try {
        const [resAir, resEau, resNiv] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/4/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`)
        ]);

        const dataAir = await resAir.json();
        const dataEau = await resEau.json();
        const dataNiv = await resNiv.json();

        if (dataAir && dataAir.field1 !== null) tempAir = dataAir.field1;
        if (dataEau && dataEau.field4 !== null) tempEau = dataEau.field4;
        if (dataNiv && dataNiv.field5 !== null) niveauEau = dataNiv.field5;

        console.log("Données Piscine mises à jour.");
    } catch (e) {
        console.error("Erreur Fetch Piscine :", e);
    }
}

majDonneesPiscine();
setInterval(majDonneesPiscine, 30000);

export function dessinerPiscine(ctx, x, y, w = 200, h = 200) {
    // 1. DESSIN DU CADRE (Normal)
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // 2. DESSIN DE L'ICÔNE COLORÉE
    if (imgPiscine.complete && imgPiscine.naturalWidth !== 0) {
        const size = 80;
        
        // On prépare le canvas invisible à la taille de l'icône
        offCanvas.width = size;
        offCanvas.height = size;
        
        // On dessine l'icône sur le canvas invisible
        offCtx.clearRect(0, 0, size, size);
        offCtx.drawImage(imgPiscine, 0, 0, size, size);
        
        // On colorie l'icône en cyan sur le canvas invisible UNIQUEMENT
        offCtx.globalCompositeOperation = 'source-in';
        offCtx.fillStyle = "#00ffff";
        offCtx.fillRect(0, 0, size, size);
        
        // On recopie le canvas invisible sur le canvas principal
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff";
        ctx.drawImage(offCanvas, x + (w / 2 - size / 2), y + 15);
        ctx.restore();
    }

    // 3. TEXTES
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    ctx.font = "16px Arial";
    ctx.fillText("AIR EXT : " + tempAir + "°", x + w / 2, y + 115);
    
    ctx.font = "bold 20px Arial";
    ctx.fillText("EAU : " + tempEau + "°", x + w / 2, y + 145);
    
    ctx.font = "16px Arial";
    ctx.fillText("NIVEAU : " + niveauEau, x + w / 2, y + 175);
    
    ctx.restore();
}