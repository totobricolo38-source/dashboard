// --- FICHIER piscine.js ---
import { dessiner_icone } from './utils.js';

// Variables pour stocker les données
let tempAir = "--";
let tempEau = "--";
let niveauEau = "--";

/**
 * Récupération des données ThingSpeak
 */
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

        // Mise à jour si données présentes (Air=Field1, Eau=Field4, Niveau=Field5)
        if (dataAir && dataAir.field1 !== null) tempAir = dataAir.field1;
        if (dataEau && dataEau.field4 !== null) tempEau = dataEau.field4;
        if (dataNiv && dataNiv.field5 !== null) niveauEau = dataNiv.field5;

        console.log("Données Piscine OK");
    } catch (e) {
        console.error("Erreur Fetch Piscine:", e);
    }
}

// Initialisation
majDonneesPiscine();
setInterval(majDonneesPiscine, 30000);

/**
 * Dessin du widget complet
 */
export function dessinerPiscine(ctx, x, y, w = 200, h = 200) {
    // A. CADRE EXTÉRIEUR
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // B. ICÔNE (via la fonction partagée dans utils.js)
    // On centre l'icône (80x80) horizontalement dans le cadre
    const tailleIcone = 80;
    const iconeX = x + (w / 2 - tailleIcone / 2);
    const iconeY = y + 15;
    
    dessiner_icone(ctx, iconeX, iconeY, tailleIcone, tailleIcone, "piscine.svg");

    // C. AFFICHAGE DES TEXTES
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Air
    ctx.font = "16px Arial";
    ctx.fillText("AIR EXT : " + tempAir + "°", x + w/2, y + 115);
    
    // Eau (Principal)
    ctx.font = "bold 20px Arial";
    ctx.fillText("EAU : " + tempEau + "°", x + w/2, y + 145);
    
    // Niveau
    ctx.font = "16px Arial";
    ctx.fillText("NIVEAU : " + niveauEau, x + w/2, y + 175);
    
    ctx.restore();
}