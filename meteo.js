// meteo.js
let xNuage = 0;

export function dessinerMeteo(ctx, x, y, w, h) {
    // On dessine un fond pour cette zone
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(x + 10, y + 10, w - 20, h - 20); // Petit padding de 10px

    // Le soleil centré dans SA zone
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(x + w/2, y + h/3, 40, 0, Math.PI * 2);
    ctx.fill();

    // Animation du nuage limitée à SA zone
    xNuage += 0.5;
    if (xNuage > w - 50) xNuage = 0;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x + xNuage, y + h/2, 20, 0, Math.PI * 2);
    ctx.fill();
}