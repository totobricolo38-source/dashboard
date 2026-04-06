// --- FICHIER batterie.js ---
import { dessiner_widget, lire_api } from '../utils.js';

let batAir = "--", batPiscine = "--", batChambre = "--";

// On définit la base une seule fois pour la lisibilité
const BASE = "https://api.thingspeak.com/channels/2787477/fields/";

/**
 * Récupération simplifiée des 3 niveaux de batterie
 */
export async function majDonneesBatterie() {
    // Utilisation de lire_api avec le lien complet et le nom du champ à extraire
    batAir     = await lire_api(`${BASE}3/last.json`, "field3");
    batPiscine = await lire_api(`${BASE}6/last.json`, "field6");
    batChambre = await lire_api(`${BASE}8/last.json`, "field8");
    
    console.log("Batteries : Mise à jour OK");
}

// Lancement et boucle de rafraîchissement
majDonneesBatterie();
setInterval(majDonneesBatterie, 30000);

/**
 * Rendu du widget
 */
export function dessinerBatterie(ctx, x, y) {
    // Correction : Ajout du ` après ${batChambre} et de la parenthèse fermante
    dessiner_widget(ctx, x, y, "batterie.svg", `EXT : ${batAir}`, `PISC : ${batPiscine}`, `CHAM : ${batChambre}`);
}