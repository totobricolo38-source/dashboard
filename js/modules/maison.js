// --- FICHIER maison.js ---
import { dessiner_widget, lire_api } from '../utils.js';

let tempSalon = "--";
let tempChambre = "--";

const BASE = "https://api.thingspeak.com/channels/2787477/fields/";

/**
 * Récupération simplifiée des températures Maison
 */
export async function majDonneesMaison() {
    // Utilisation de ton nouvel outil avec le lien direct
    tempSalon   = await lire_api(`${BASE}2/last.json`, "field2");
    tempChambre = await lire_api(`${BASE}7/last.json`, "field7");
    
    console.log("Maison : Mise à jour OK");
}

// Initialisation et rafraîchissement toutes les 30s
majDonneesMaison();
setInterval(majDonneesMaison, 30000);

/**
 * Rendu du widget Maison
 */
export function dessinerMaison(ctx, x, y) {
    dessiner_widget(ctx,x,y,"maison.svg",`SALON : ${tempSalon}°`,`CHAMBRE : ${tempChambre}°`,"");
}