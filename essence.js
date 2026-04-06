// --- CONFIGURATION ET STOCKAGE ---
let prixActuel = "--";
const CP_VILLE = "38430"; // St-Jean-de-Moirans
const DELAI_MAJ = 30000;   // 30 secondes (Mode "Homme Pressé")

/**
 * 1. MOTEUR DE MISE À JOUR (FETCH)
 * Récupère le prix E10 via l'API OpenData Gouv
 */
export async function majPrixEssence() {
    const url = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%22${CP_VILLE}%22&limit=1`;
    
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) throw new Error(`Erreur HTTP: ${reponse.status}`);
        
        const donnees = await reponse.json();
        
        if (donnees.results && donnees.results.length > 0) {
            const station = donnees.results[0];
            // Extraction du prix E10 (selon la structure de l'API v2.1)
            if (station.e10_prix !== undefined && station.e10_prix !== null) {
                prixActuel = station.e10_prix;
                console.log(`[ESSENCE] MAJ OK : ${prixActuel}€ (CP: ${CP_VILLE})`);
            }
        }
    } catch (erreur) {
        console.error("[ESSENCE] Erreur API :", erreur.message);
        // On ne change pas prixActuel pour garder la dernière valeur connue
    }
}

// Lancement du cycle de mise à jour
majPrixEssence();
setInterval(majPrixEssence, DELAI_MAJ);

/**
 * 2. RENDU GRAPHIQUE (CANVAS)
 * Dessine le bloc de 200x200
 */
export function dessinerEssence(ctx, x, y) {
    // --- CADRE ---
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.restore();

    // --- TEXTES ---
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    // Label Carburant
    ctx.font = "bold 25px Arial";
    ctx.fillText("E10", x + 100, y + 80);

    // Valeur du Prix
    ctx.font = "bold 45px Arial";
    if (prixActuel === "--") {
        ctx.fillText("...", x + 100, y + 140);
    } else {
        // Ajout du symbole €
        ctx.fillText(prixActuel + "€", x + 100, y + 140);
    }

    // Ville / Info bas
    ctx.font = "12px Arial";
    ctx.globalAlpha = 0.7; // Légèrement plus discret
    ctx.fillText("ST-JEAN-DE-MOIRANS", x + 100, y + 180);
    ctx.restore();
}