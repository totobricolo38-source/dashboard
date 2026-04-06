// --- FICHIER js/modules/meteo.js ---
import { dessiner_widget, lire_api } from '../utils.js';

let tempAir = "--";
let codeMeteo = "--";

const URL_VOIRON = "https://api.open-meteo.com/v1/forecast?latitude=45.3591&longitude=5.5856&current=temperature_2m,weather_code&timezone=Europe%2FParis";

/**
 * Traduit le code WMO en texte clair
 */
function getLibelleMeteo(code) {
    if (code === "--") return "CHARGEMENT...";
    
    const c = parseInt(code);
    if (c === 0) return "CIEL DÉGAGÉ";
    if (c === 1) return "PEU NUAGEUX";
    if (c === 2) return "PART. NUAGEUX";
    if (c === 3) return "NUAGEUX";
    if (c === 45 || c === 48) return "BROUILLARD";
    if (c >= 51 && c <= 55) return "BRUINE";
    if (c >= 61 && c <= 65) return "PLUIE";
    if (c >= 71 && c <= 75) return "NEIGE";
    if (c >= 80 && c <= 82) return "AVERSES";
    if (c >= 95) return "ORAGEUX";
    
    return "INCONNU";
}

/**
 * Associe le code au nom du fichier SVG (sans le chemin, utils s'en occupe)
 */
function getIconeMeteo(code) {
    if (code === "--") return "question.svg"; 
    const c = parseInt(code);
    
    if (c === 0) return "soleil.svg";
    if (c >= 1 && c <= 3) return "nuage-soleil.svg";
    if (c === 45 || c === 48) return "brouillard.svg";
    if (c >= 51 && c <= 55) return "pluie-legere.svg";
    if ((c >= 61 && c <= 65) || (c >= 80 && c <= 82)) return "pluie.svg";
    if (c >= 71 && c <= 75) return "neige.svg";
    if (c >= 95) return "orage.svg";
    
    return "question.svg";
}

export async function majDonneesMeteo() {
    try {
        tempAir = await lire_api(URL_VOIRON, "current.temperature_2m");
        codeMeteo = await lire_api(URL_VOIRON, "current.weather_code");
    } catch (e) { console.error(e); }
}

majDonneesMeteo();
setInterval(majDonneesMeteo, 30000);

export function dessinerMeteo(ctx, x, y) {
    const ligne1 = tempAir !== "--" ? `${tempAir}°C` : "---";
    // Utilisation du libellé au lieu du code brut
    const ligne2 = getLibelleMeteo(codeMeteo);
    const ligne3 = "VOIRON";

    const nomIcone = getIconeMeteo(codeMeteo);

    dessiner_widget(ctx, x, y, nomIcone, ligne1, ligne2, ligne3);
}