// --- FICHIER meteo.js ---
import { dessiner_widget, lire_api } from '../utils.js';

let tempAir = "--";
let codeMeteo = "--";

// URL Voiron (Open-Meteo) : Latitude 45.35 / Longitude 5.58
const URL_VOIRON = "https://api.open-meteo.com/v1/forecast?latitude=45.3591&longitude=5.5856&current=temperature_2m,weather_code&timezone=Europe%2FParis";

/**
 * Associe le code WMO aux fichiers SVG présents dans ton dossier.
 * Utilise "question.svg" en cas de code non répertorié.
 */
function getIconeMeteo(code) {
    if (code === "--" || code === null) return "question.svg"; 
    
    const c = parseInt(code);
    
    // 0 : Ciel dégagé
    if (c === 0) return "soleil.svg";
    
    // 1, 2, 3 : Partiellement nuageux
    if (c >= 1 && c <= 3) return "nuage-soleil.svg";
    
    // 45, 48 : Brouillard
    if (c === 45 || c === 48) return "brouillard.svg";
    
    // 51, 53, 55 : Bruine
    if (c >= 51 && c <= 55) return "pluie-legere.svg";
    
    // 61, 63, 65 (Pluie) ET 80, 81, 82 (Averses) -> Même icône selon ton choix
    if ((c >= 61 && c <= 65) || (c >= 80 && c <= 82)) return "pluie.svg";
    
    // 71, 73, 75 : Neige
    if (c >= 71 && c <= 75) return "neige.svg";
    
    // 95, 96, 99 : Orage
    if (c >= 95) return "orage.svg";
    
    // Par défaut si le code envoyé par l'API est inconnu
    return "question.svg";
}

/**
 * Récupération des données météo toutes les 30 secondes
 */
export async function majDonneesMeteo() {
    try {
        // Utilisation de lire_api pour extraire les valeurs du JSON
        tempAir = await lire_api(URL_VOIRON, "current.temperature_2m");
        codeMeteo = await lire_api(URL_VOIRON, "current.weather_code");
        
        console.log(`[METEO] MàJ réussie : ${tempAir}°C (Code: ${codeMeteo})`);
    } catch (error) {
        console.error("[METEO] Erreur API :", error);
    }
}

// Initialisation au chargement
majDonneesMeteo();
// Boucle de mise à jour (30s)
setInterval(majDonneesMeteo, 30000);

/**
 * Rendu graphique du widget (Format Standard 200x200)
 */
export function dessinerMeteo(ctx, x, y) {
    // Préparation des lignes de texte pour le widget
    const ligne1 = tempAir !== "--" ? `${tempAir}°C` : "CHARGEMENT...";
    const ligne2 = codeMeteo !== "--" ? `CODE : ${codeMeteo}` : "";
    const ligne3 = "VOIRON";

    // Détermination de l'icône dynamique
    const nomIcone = getIconeMeteo(codeMeteo);

    // Appel à la fonction de dessin globale (gère le néon bleu et le cadre)
    dessiner_widget(ctx, x, y, nomIcone, ligne1, ligne2, ligne3);
}