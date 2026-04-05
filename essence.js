/* Récupération du prix SP95 à Coublevie (Flux Temps Réel Gouv) */
export async function recupererPrix() {
    /* Nouvelle URL API V2.1 plus stable */
    var url = "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=ville%3D%22COUBLEVIE%22&limit=1";
    
    try {
        var reponse = await fetch(url);
        var donnees = await reponse.json();
        
        /* On vérifie si on a bien un résultat pour Coublevie */
        if (donnees.results && donnees.results.length > 0) {
            var station = donnees.results[0];
            /* On cherche le SP95 dans la liste des prix de la station */
            var prix_trouve = station.prix.find(function(p) {
                return p.nom === "SP95";
            });
            
            if (prix_trouve) {
                return prix_trouve.valeur; /* <--- LA VRAIE VALEUR ICI */
            }
        }
        return "N/A"; /* Si la station ne vend pas de SP95 */
    } catch (erreur) {
        console.error("Erreur de connexion API Gouv :", erreur);
        return "ERR"; /* Affiche ERR si pas d'internet */
    }
}

/* Rendu graphique */
export function dessinerEssence(ctx, x, y, prix) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.font = "bold 25px Arial";
    ctx.fillText("SP95", x + 100, y + 80);

    /* Affichage du prix dynamique */
    ctx.font = "bold 45px Arial";
    ctx.fillText(prix + "€", x + 100, y + 140);
}