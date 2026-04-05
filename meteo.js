// meteo.js
let angleOscillation = 0;

function cercle(ctx, x, y, rayon, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.arc(x, y, rayon, 0, Math.PI * 2);
    ctx.fill();
}

export function dessinerMeteo(ctx, x, y, w, h) {
    // Nettoyage de la zone (fond sombre)
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x + 10, y + 10, w - 20, h - 20);

    // Positions de base centrées dans la zone
    const centreX = x + w / 2;
    const centreY = y + h / 2;

    // --- LE SOLEIL (Fixe) ---
    cercle(ctx, centreX, centreY - 40, 50, "yellow");

    // --- LES NUAGES (Oscillants) ---
    // Calcul de l'offset vertical (oscillation de 15 pixels de haut en bas)
    angleOscillation += 0.05;
    const offsetV = Math.sin(angleOscillation) * 15;
    const yNuage = centreY + 20 + offsetV;

    // Dessin des 3 ronds du nuage
    cercle(ctx, centreX - 35, yNuage, 35, "rgba(255, 255, 255, 0.9)"); // Gauche
    cercle(ctx, centreX + 35, yNuage, 35, "rgba(255, 255, 255, 0.9)"); // Droite
    cercle(ctx, centreX, yNuage - 20, 40, "white");                  // Sommet
}