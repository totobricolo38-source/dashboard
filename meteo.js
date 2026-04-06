let tempAir = "--"; 
let codeMeteo = "--";

/* 1. Récupération des données Open-Meteo */
export async function majDonneesMeteo() {
    // Coordonnées pour Voiron
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

// Lancement et intervalle (toutes les 15 minutes suffit pour la météo réelle)
majDonneesMeteo();
setInterval(majDonneesMeteo, 900000); 

/* 2. Rendu graphique minimaliste */
export function dessinerMeteo(ctx, x, y) {
    // Cadre blanc
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, 200, 200);

    // Affichage des valeurs
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    
    // Titre
    ctx.font = "14px Arial";
    ctx.fillText("VOIRON", x + 100, y + 40);

    // Température principale
    ctx.font = "bold 45px Arial";
    ctx.fillText(tempAir + "°C", x + 100, y + 110);
    
    // Code Météo et Batterie Néon
    ctx.font = "12px Arial";
    ctx.globalAlpha = 0.7;
    ctx.fillText("CODE CIEL : " + codeMeteo, x + 100, y + 150);
    ctx.globalAlpha = 1.0;

    // --- BATTERIE BLEU NÉON ---
    const bx = x + 160; 
    const by = y + 175;
    const neon = "#00ffff";

    ctx.strokeStyle = neon;
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, 25, 12);
    ctx.fillStyle = neon;
    ctx.fillRect(bx + 25, by + 4, 2, 4);
    ctx.globalAlpha = 0.8;
    ctx.fillRect(bx + 3, by + 3, 18, 6); // Batterie "pleine"
    ctx.globalAlpha = 1.0;
}