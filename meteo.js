// --- FICHIER meteo.js ---
import { dessiner_widget, lire_api } from './utils.js';

let tempAir = "--";
let codeMeteo = "--";

// URL Voiron avec les paramètres current (température et code ciel)
const URL_VOIRON = "https://api.open-meteo.com/v1/forecast?latitude=45.3591&longitude=5.5856&current=temperature_2m,weather_code&timezone=Europe%2FParis";

/**
 * Récupération des données météo
 */
export async function majDonneesMeteo() {
    // On utilise le "chemin pointé" grâce à ton nouveau lire_api
    tempAir = await lire_api(URL_VOIRON, "current.temperature_2m");
    codeMeteo = await lire_api(URL_VOIRON, "current.weather_code");
    
    console.log(`[METEO] Voiron : ${tempAir}°C (Code: ${codeMeteo})`);
}

// Lancement initial et boucle toutes les 30 secondes
majDonneesMeteo();
setInterval(majDonneesMeteo, 30000);

/**
 * Rendu du widget Météo (Format Standardisé 200x200)
 */
export function dessinerMeteo(ctx, x, y) {
    // Préparation des lignes de texte
    const ligne1 = tempAir !== "--" ? `${tempAir}°C` : "CHARGEMENT...";
    const ligne2 = codeMeteo !== "--" ? `CODE : ${codeMeteo}` : "";
    const ligne3 = "VOIRON";

    // Appel de l'outil unique de utils.js
    dessiner_widget(ctx,x,y,"meteo.svg",ligne1,ligne2,ligne3);
}