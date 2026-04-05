// horloge.js
export function dessinerHorloge(ctx, x, y) {
    const w = 200;
    const h = 200;

    // Cadre blanc
    ctx.strokeStyle = "white";
    ctx.strokeRect(x, y, w, h);

    const maintenant = new Date();
    const hStr = maintenant.getHours().toString().padStart(2, '0');
    const mStr = maintenant.getMinutes().toString().padStart(2, '0');

    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${hStr}:${mStr}`, x + w/2, y + h/2 + 15);
}