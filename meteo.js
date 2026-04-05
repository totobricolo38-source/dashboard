var temps = 0;

/* Fonction utilitaire pour tracer un cercle */
function tracer_cercle(ctx, x, y, r, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
}

/* Rendu graphique du bloc Météo */
export function dessinerMeteo(ctx, x, y) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    temps += 0.02;

    /* Dessin du soleil */
    tracer_cercle(ctx, x + 100, y + 70, 35, "yellow");

    /* Calcul des oscillations (style pur C) */
    function calculer_y(freq, offset) {
        return y + 130 + offset + (Math.sin(temps * freq) * 5);
    }

    /* Dessin des nuages */
    tracer_cercle(ctx, x + 75,  calculer_y(1, 0),    25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 125, calculer_y(1.3, 0),  25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 100, calculer_y(1.7, -15), 30, "#ffffff");
}