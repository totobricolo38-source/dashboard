var temps = 0;
let tempAir = "--"; // Variable pour stocker la valeur

/* 1. Récupération des données (Même méthode que piscine.js) */
export async function majDonneesMeteo() {
    const channelID = "2787477";
    try {
        const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`);
        const data = await response.json();
        
        // On vérifie le field1 (airtemp)
        if (data && data.field1 !== null && data.field1 !== undefined) {
            tempAir = data.field1;
            console.log("Météo : Température Air mise à jour (" + tempAir + "°)");
        }
    } catch (e) {
        console.error("Erreur Fetch Météo:", e);
    }
}

// Lancement automatique
majDonneesMeteo();
setInterval(majDonneesMeteo, 30000);

/* Fonction utilitaire pour tracer un cercle */
function tracer_cercle(ctx, x, y, r, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
}

/* Rendu graphique du bloc Météo */
export function dessinerMeteo(ctx, x, y) {
    // Cadre
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    temps += 0.02;

    /* Dessin du soleil */
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "yellow";
    tracer_cercle(ctx, x + 100, y + 60, 35, "yellow");
    ctx.restore();

    /* Calcul des oscillations */
    function calculer_y(freq, offset) {
        return y + 110 + offset + (Math.sin(temps * freq) * 5);
    }

    /* Dessin des nuages */
    tracer_cercle(ctx, x + 75,  calculer_y(1, 0),    25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 125, calculer_y(1.3, 0),  25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 100, calculer_y(1.7, -15), 30, "#ffffff");

    /* 2. Affichage de la température (resAir) */
    ctx.save();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 22px Arial";
    // On affiche la valeur récupérée
    ctx.fillText(tempAir + "°C", x + 100, y + 180);
    
    ctx.font = "14px Arial";
    ctx.fillText("EXTÉRIEUR", x + 100, y + 155);
    ctx.restore();
}