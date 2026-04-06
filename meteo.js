var temps = 0;
let tempAir = "--";    // Température Voiron
let codeMeteo = "--";   // Code météo (0, 1, 2, 3...)

/* 1. Récupération des données Open-Meteo (Voiron) */
export async function majDonneesMeteo() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=45.35917814&longitude=5.58567786&current=temperature_2m,weather_code&timezone=Europe%2FParis";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
            tempAir = data.current.temperature_2m;
            codeMeteo = data.current.weather_code;
            console.log(`Météo Voiron : ${tempAir}°C, Code : ${codeMeteo}`);
        }
    } catch (e) {
        console.error("Erreur Fetch Open-Meteo:", e);
    }
}

// Lancement et intervalle (30s)
majDonneesMeteo();
setInterval(majDonneesMeteo, 30000);

/* Fonction utilitaire cercle */
function tracer_cercle(ctx, x, y, r, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

/* Rendu graphique du bloc Météo */
export function dessinerMeteo(ctx, x, y) {
    // Le cadre ext sera dessiné par ton bloc unifié 600x200
    temps += 0.02;

    /* Dessin du soleil (Halo) */
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "yellow";
    tracer_cercle(ctx, x + 100, y + 60, 35, "yellow");
    ctx.restore();

    /* Animation nuages */
    function calculer_y(freq, offset) {
        return y + 110 + offset + (Math.sin(temps * freq) * 5);
    }
    tracer_cercle(ctx, x + 75,  calculer_y(1, 0),    25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 125, calculer_y(1.3, 0),  25, "rgba(200,200,200,0.8)");
    tracer_cercle(ctx, x + 100, calculer_y(1.7, -15), 30, "#ffffff");

    /* Affichage des 2 valeurs de Voiron */
    ctx.save();
    ctx.fillStyle = "#00FFFF";
    ctx.textAlign = "center";
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00FFFF";

    // Valeur 1 : Température
    ctx.fillText(tempAir + "°C", x + 100, y + 165);
    
    // Valeur 2 : Code Météo
    ctx.font = "bold 16px 'Courier New', monospace";
    ctx.fillText("CODE: " + codeMeteo, x + 100, y + 190);
    ctx.restore();
}