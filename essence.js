import { dessiner_widget, lire_api } from './utils.js';

let prixE10 = "--";
const URL_ESSENCE = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%2238430%22&limit=1`;

export async function majDonneesEssence() {
    // On appelle notre nouvel outil avec le lien et le nom du prix
    prixE10 = await lire_api(URL_ESSENCE, "e10_prix");
}

majDonneesEssence();
setInterval(majDonneesEssence, 30000);

export function dessinerEssence(ctx, x, y) {
    const lignePrix = (prixE10 === "--") ? "CHARGEMENT..." : `${prixE10} €`;
    dessiner_widget(ctx, x, y, "carburant.svg", "SANS PLOMB E10", lignePrix, "ST-JEAN-DE-M.");
}