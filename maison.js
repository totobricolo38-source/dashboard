// --- FICHIER maison.js ---
import { dessiner_widget } from './utils.js';

let tempSalon = "--";
let tempChambre = "--";

export async function majDonneesMaison() {
    const channelID = "2787477";
    const baseURL = `https://api.thingspeak.com/channels/${channelID}/fields/`;

    try {
        // Lancement des deux requêtes en parallèle
        const [resSalon, resChambre] = await Promise.all([
            fetch(`${baseURL}2/last.json`),
            fetch(`${baseURL}7/last.json`)
        ]);

        const dataSalon = await resSalon.json();
        const dataChambre = await resChambre.json();

        // Mise à jour des variables si les champs ne sont pas vides
        if (dataSalon.field2 !== null) tempSalon = dataSalon.field2;
        if (dataChambre.field7 !== null) tempChambre = dataChambre.field7;

        console.log("Maison (Fields 2 & 7) : Mise à jour OK");
    } catch (e) {
        console.error("Erreur lors de la récupération des données Maison :", e);
    }
}

// Lancement initial et boucle de rafraîchissement
majDonneesMaison();
setInterval(majDonneesMaison, 30000);

/**
 * Affiche le widget 200x200 via la fonction globale de utils.js
 */
export function dessinerMaison(ctx, x, y) {
    dessiner_widget(ctx,x,y,"maison.svg",`SALON : ${tempSalon}°`,`CHAMBRE : ${tempChambre}°`,"");
}