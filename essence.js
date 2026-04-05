/* Récupération du prix - St-Jean-de-Moirans */
export async function recupererPrix() {
    var url = "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%2238430%22&limit=1";
    
    try {
        var reponse = await fetch(url);
        var donnees = await reponse.json();
        
        /* Accès direct selon ta capture : results -> 0 -> e10_prix */
        var station = donnees.results[0];
        var valeur = station.e10_prix;

        /* Si la valeur existe, on la renvoie, sinon ERR */
        if (valeur != null) {
            return valeur;
        }
        
        return "ERR";
    } catch (erreur) {
        return "ERR";
    }
}

/* Rendu graphique - Style C */
export function dessinerEssence(ctx, x, y, prix) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    /* On affiche E10 puisque c'est la donnée que l'on extrait */
    ctx.font = "bold 25px Arial";
    ctx.fillText("E10", x + 100, y + 80);

    ctx.font = "bold 45px Arial";
    if (prix === "ERR") {
        ctx.fillText("ERR", x + 100, y + 140);
    } else {
        ctx.fillText(prix + "€", x + 100, y + 140);
    }
}