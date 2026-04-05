/* Fonction de rendu pour l'affichage de l'heure digitale */
export function dessinerHorloge(ctx, x, y) {
    /* 1. Dessin du cadre blanc */
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    /* 2. Récupération de l'heure système au format HH:MM */
    var date_actuelle = new Date();
    var heure_formatee = date_actuelle.toLocaleTimeString('fr-FR', {
        hour: '2-digit', 
        minute: '2-digit'
    });

    /* 3. Configuration du texte */
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 45px Arial";
    ctx.textAlign = "center";

    /* 4. Affichage de l'heure au centre du bloc */
    /* Position : x + 100 (milieu horizontal), y + 110 (milieu vertical environ) */
    ctx.fillText(heure_formatee, x + 100, y + 110);
}