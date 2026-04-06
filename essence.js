// --- essence.js ---
let prixActuel = "--";
const CP_VILLE = "38430"; 
const DELAI_MAJ = 30000;

export async function majPrixEssence() {
    const url = `https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%22${CP_VILLE}%22&limit=1`;
    try {
        const reponse = await fetch(url);
        const donnees = await reponse.json();
        if (donnees.results && donnees.results.length > 0) {
            const station = donnees.results[0];
            if (station.e10_prix !== undefined && station.e10_prix !== null) {
                prixActuel = station.e10_prix;
                console.log(`[ESSENCE] MAJ OK : ${prixActuel}€`);
            }
        }
    } catch (erreur) {
        console.error("[ESSENCE] Erreur API :", erreur.message);
    }
}

majPrixEssence();
setInterval(majPrixEssence, DELAI_MAJ);

// RENDU GRAPHIQUE
export function dessinerEssence(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.font = "bold 25px Arial";
    ctx.fillText("E10", x + 100, y + 80);

    ctx.font = "bold 45px Arial";
    // Ici on utilise bien la variable 'prixActuel' du module
    ctx.fillText((prixActuel === "--" ? "..." : prixActuel + "€"), x + 100, y + 140);

    ctx.font = "12px Arial";
    ctx.globalAlpha = 0.7;
    ctx.fillText("ST-JEAN-DE-MOIRANS", x + 100, y + 180);
    ctx.restore();
}