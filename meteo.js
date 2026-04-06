let tempAir = "--";    // Température Voiron
let codeMeteo = "--";   // Code météo (ex: 0, 1, 45...)

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

/* 2. Rendu textuel (Sans graphismes) */
export function dessinerMeteo(ctx, x, y) {
    // x, y est le coin haut-gauche de ton bloc 200x200
    
    ctx.save();
    
    // Style Cyber Minimaliste
    ctx.fillStyle = "#00FFFF";
    ctx.textAlign = "center";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00FFFF";

    // Affichage de la Température (Milieu haut)
    ctx.font = "bold 35px 'Courier New', monospace";
    ctx.fillText(tempAir + "°C", x + 100, y + 90);
    
    // Affichage du Code Météo (Milieu bas)
    ctx.font = "bold 20px 'Courier New', monospace";
    ctx.fillText("CODE: " + codeMeteo, x + 100, y + 140);
    
    // Label de la zone
    ctx.font = "12px 'Courier New', monospace";
    ctx.fillText("VOIRON METEO", x + 100, y + 175);

    ctx.restore();
}