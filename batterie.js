// --- FICHIER batterie.js ---
import { dessiner_widget } from './utils.js';

let batAir = "--";
let batPiscine = "--";
let batChambre = "--";

/**
 * Récupération des 3 niveaux de batterie (Fields 3, 6 et 8)
 */
export async function majDonneesBatterie() {
    const channelID = "2787477";
    const baseURL = `https://api.thingspeak.com/channels/${channelID}/fields/`;

    try {
        // Récupération simultanée des 3 batteries
        const [resAir, resPool, resBR] = await Promise.all([
            fetch(`${baseURL}3/last.json`),
            fetch(`${baseURL}6/last.json`),
            fetch(`${baseURL}8/last.json`)
        ]);

        const dataAir = await resAir.json();
        const dataPool = await resPool.json();
        const dataBR = await resBR.json();

        // Mise à jour des variables (on ajoute % car ce sont des batteries)
        if (dataAir.field3 !== null) batAir = dataAir.field3;
        if (dataPool.field6 !== null) batPiscine = dataPool.field6;
        if (dataBR.field8 !== null) batChambre = dataBR.field8;

        console.log("Batteries : Mise à jour OK");
    } catch (e) {
        console.error("Erreur lors de la récupération des batteries :", e);
    }
}

// Initialisation et boucle 30s
majDonneesBatterie();
setInterval(majDonneesBatterie, 30000);

/**
 * Dessin du widget Batterie via l'outil de haut niveau
 */
export function dessinerBatterie(ctx, x, y) {
    dessiner_widget(
        ctx,
        x,
        y,
        "batterie.svg",
        `EXT : ${batAir}%`,
        `PISC : ${batPiscine}%`,
        `CHAM : ${batChambre}%`
    );
}