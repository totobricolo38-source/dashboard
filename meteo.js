// meteo.js
let xOscille = 0;

function cercle(ctx, x, y, rayon, couleur) {
    ctx.fillStyle = couleur;
    ctx.beginPath();
    ctx.arc(x, y, rayon, 0, Math.PI * 2);
    ctx.fill();
}

export function dessinerMeteo(ctx, x, y) {
    const w = 200;
    const h = 200;

    // 1. Cadre blanc et fond
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

    const centreX = x + w / 2;
    const centreY = y + h / 2;

    // 2. SOLEIL fixe (plus petit pour le cadre 200x200)
    cercle(ctx, centreX, centreY - 30, 35, "yellow");

    // 3. NUAGES (Oscillation horizontale)
    xOscille += 0.03; 
    const offsetH = Math.sin(xOscille) * 20; // Bouge de 20px gauche/droite
    const yN = centreY + 30;
    const xN = centreX + offsetH;

    // Dessin du nuage réduit
    cercle(ctx, xN - 25, yN, 25, "rgba(255, 255, 255, 0.8)"); // Gauche
    cercle(ctx, xN + 25, yN, 25, "rgba(255, 255, 255, 0.8)"); // Droite
    cercle(ctx, xN, yN - 15, 30, "white");                   // Sommet
}