// --- FICHIER piscine.js ---

// 1. Chargement de l'icône SVG locale
const imgPiscine = new Image();
imgPiscine.src = "./piscine.svg"; 

// Variables globales pour stocker les données (initialisées à vide)
let tempAir = "--";
let tempEau = "--";
let niveauEau = "--";

/**
 * Récupère les dernières données depuis l'API ThingSpeak
 */
export async function majDonneesPiscine() {
    const channelID = "2787477";
    try {
        // On récupère Air (Field 1), Eau (Field 4), Niveau (Field 5)
        const [resAir, resEau, resNiv] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/4/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`)
        ]);

        const dataAir = await resAir.json();
        const dataEau = await resEau.json();
        const dataNiv = await resNiv.json();

        // Mise à jour des variables si les données sont valides
        if (dataAir && dataAir.field1 !== null) tempAir = dataAir.field1;
        if (dataEau && dataEau.field4 !== null) tempEau = dataEau.field4;
        if (dataNiv && dataNiv.field5 !== null) niveauEau = dataNiv.field5;

        console.log("Données Piscine (Air/Eau/Niveau) mises à jour.");
    } catch (e) {
        console.error("Erreur Fetch Piscine :", e);
    }
}

// Premier appel immédiat au chargement du module
majDonneesPiscine();

// Mise à jour automatique toutes les 30 secondes
setInterval(majDonneesPiscine, 30000);

/**
 * Dessine le widget piscine sur le canvas
 * @param {CanvasRenderingContext2D} ctx - Le contexte du canvas
 * @param {number} x - Position X du coin haut gauche
 * @param {number} y - Position Y du coin haut gauche
 * @param {number} w - Largeur du cadre
 * @param {number} h - Hauteur du cadre
 */
export function dessinerPiscine(ctx, x, y, w = 200, h = 200) {
    // A. DESSIN DU CADRE
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // On ne dessine l'icône que si le fichier est bien chargé
    if (imgPiscine.complete) {
        // B. DESSIN DE L'ICÔNE (piscine.svg)
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff"; // Lueur cyan
        
        const size = 80;
        // Centrage horizontal (x + w/2) et décalage vertical vers le haut
        ctx.drawImage(imgPiscine, x + (w / 2 - size / 2), y + 15, size, size);
        ctx.restore();
    }

    // C. AFFICHAGE DES TEXTES (Centrés horizontalement)
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Température Air
    ctx.font = "16px Arial";
    ctx.fillText("AIR EXT : " + tempAir + "°", x + w / 2, y + 115);
    
    // Température Eau (Mise en avant)
    ctx.font = "bold 20px Arial";
    ctx.fillText("EAU : " + tempEau + "°", x + w / 2, y + 145);
    
    // Niveau d'eau
    ctx.font = "16px Arial";
    ctx.fillText("NIVEAU : " + niveauEau, x + w / 2, y + 175);
    
    ctx.restore();
}