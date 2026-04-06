let tempAir = "--";    // Température Voiron
let codeMeteo = "--";   // Code météo

/* 1. Récupération des données Open-Meteo (Voiron) */
export async function majDonneesMeteo() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=45.35917814&longitude=5.58567786&current=temperature_2m,weather_code&timezone=Europe%2FParis";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.current) {
            tempAir = data.current.temperature_2m;
            codeMeteo = data.current.weather_code;
            console.log(`Données Voiron : ${tempAir}°C, Code : ${codeMeteo}`);
        }
    } catch (e) {
        console.error("Erreur Fetch Open-Meteo:", e);
    }
}

// Mise à jour toutes les 30 secondes
majDonneesMeteo();
setInterval(majDonneesMeteo, 30000);

/* 2. Rendu Graphique Minimaliste */
export function dessinerMeteo(ctx, x, y) {
    // CADRE BLANC 200x200
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    // TEXTE EN BLANC
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    // Température (Gros et centré)
    ctx.font = "bold 35px Arial";
    ctx.fillText(tempAir + "°C", x + 100, y + 90);
    
    // Code Météo
    ctx.font = "bold 20px Arial";
    ctx.fillText("CODE: " + codeMeteo, x + 100, y + 135);
    
    // Label
    ctx.font = "14px Arial";
    ctx.fillText("VOIRON", x + 100, y + 170);

    ctx.restore();
}