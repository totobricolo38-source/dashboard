/* Récupération du prix par Code Postal (38500) */
export async function recupererPrix() {
    /* Recherche sur Voiron/Coublevie via le code postal 38500 */
    var url = "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=cp%3D%2238500%22&limit=10";
    
    try {
        var reponse = await fetch(url);
        var donnees = await reponse.json();
        
        if (donnees.results && donnees.results.length > 0) {
            /* On cherche la station Carrefour (souvent la première ou la moins chère) */
            var station = donnees.results.find(function(s) {
                return s.nom && s.nom.includes("Carrefour");
            }) || donnees.results[0]; // Sinon on prend la première station de la liste

            /* On cherche le SP95 ou E5 */
            var carburant = station.prix.find(function(p) {
                return p.nom === "SP95" || p.nom === "E5";
            });
            
            if (carburant) {
                return carburant.valeur; 
            }
        }
        return "N/A";
    } catch (erreur) {
        return "ERR";
    }
}

/* Rendu graphique inchangé */
export function dessinerEssence(ctx, x, y, prix) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 25px Arial";
    ctx.fillText("SP95", x + 100, y + 80);
    ctx.font = "bold 45px Arial";
    ctx.fillText(prix + "€", x + 100, y + 140);
}