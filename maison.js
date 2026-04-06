// --- FICHIER maison.js ---
import { dessiner_icone } from './utils.js';

// Variables pour stocker les dernières valeurs valides
let tempSalon = "--";
let tempChambre = "--";

/**
 * Récupération spécifique par Field (Salon = 2, Chambre = 7)
 */
export async function majDonneesMaison() {
    const channelID = "2787477";
    
    try {
        const [resSalon, resChambre] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/2/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/7/last.json`)
        ]);

        const dataSalon = await resSalon.json();
        const dataChambre = await resChambre.json();

        if (dataSalon && dataSalon.field2 !== null) tempSalon = dataSalon.field2;
        if (dataChambre && dataChambre.field7 !== null) tempChambre = dataChambre.field7;

        console.log("Mise à jour Maison (Fields 2 & 7) OK");
    } catch (e) {
        console.error("Erreur Fetch Maison:", e);
    }
}

// Rafraîchissement toutes les 30 secondes
majDonneesMaison();
setInterval(majDonneesMaison, 30000);

/**
 * Dessin du widget Maison
 */
export function dessinerMaison(ctx, x, y, w = 200, h = 200) {
    // A. CADRE
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();

    // B. ICÔNE (via utils.js)
    // On utilise "maison.svg" (assure-toi que le fichier existe dans ton dossier)
    const tailleIcone = 80;
    const iconeX = x + (w / 2 - tailleIcone / 2);
    const iconeY = y + 15;
    
    dessiner_icone(ctx, iconeX, iconeY, tailleIcone, tailleIcone, "maison.svg");

    // C. TEXTES
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Salon
    ctx.font = "bold 18px Arial";
    ctx.fillText("SALON : " + tempSalon + "°", x + w/2, y + 130);
    
    // Chambre
    ctx.font = "18px Arial";
    ctx.fillText("CHAMBRE : " + tempChambre + "°", x + w/2, y + 165);
    
    ctx.restore();
}