// --- FICHIER bourse.js ---
import { dessiner_widget, lire_api } from '../utils.js';

let coursAI = "--";
const URL_AI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AI.PAR&apikey=$H4PJP00MI2N4YYR6`;

/**
 * Récupération du cours Air Liquide via lire_api (version Tableau)
 */
export async function majDonneesBourse() {
    // Comme "05. price" contient un point, on passe un tableau de clés
    // pour ne pas perdre lire_api dans le découpage
    const resultat = await lire_api(URL_AI, ["Global Quote", "05. price"]);

    if (resultat !== "--") {
        const prix = parseFloat(resultat);
        coursAI = prix.toFixed(2);
        console.log(`[BOURSE] Air Liquide : ${coursAI} €`);
    } else {
        coursAI = "--";
        console.warn("Bourse : Erreur ou quota atteint.");
    }
}

// Rafraîchissement toutes les 60 min (pour rester sous les 25 appels/jour)
majDonneesBourse();
setInterval(majDonneesBourse, 3600000);

/**
 * Rendu du widget
 */
export function dessinerBourse(ctx, x, y) {
    dessiner_widget(
        ctx,x,y,"bourse.svg","AIR LIQUIDE",(coursAI === "--" ? "CHARGEMENT..." : `${coursAI} €`),"ALPHAVANTAGE");
}