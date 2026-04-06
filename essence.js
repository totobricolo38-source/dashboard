// --- FICHIER essence.js ---
import { dessiner_widget } from './utils.js';

let prixE10 = "--";
const CP_VILLE = "38430"; 

/**
 * Récupération du prix E10 via l'API OpenData
 */
export async function majPrixEssence() {
    const url = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%22${CP_VILLE}%22&limit=1`;
    
    try {
        const reponse = await fetch(url);
        const donnees = await reponse.json();
        
        if (donnees.results && donnees.results.length > 0) {
            const station = donnees.results[0];
            if (station.e10_prix !== undefined && station.e10_prix !== null) {
                prixE10 = station.e10_prix;
                console.log(`[ESSENCE] MAJ OK : ${prixE10}€`);
            }
        }
    } catch (erreur) {
        console.error("[ESSENCE] Erreur API :", erreur.message);
    }
}

// Initialisation et rafraîchissement
majPrixEssence();
setInterval(majPrixEssence, 30000);

/**
 * Rendu du widget Essence
 */
export function dessinerEssence(ctx, x, y) {
    // On prépare l'affichage du prix pour éviter de surcharger l'appel de fonction
    const lignePrix = (prixE10 === "--") ? "CHARGEMENT..." : `${prixE10} €`;

    // On utilise notre outil standardisé
    dessiner_widget(ctx,x,y,"carburant.svg","SANS PLOMB E10",lignePrix,"ST-JEAN-DE-M.");
}