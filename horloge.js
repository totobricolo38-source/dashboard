// horloge.js
export function dessinerHorloge(ctx, x, y, w, h) {
    const maintenant = new Date();
    const heure = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');

    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${heure}:${minutes}:${secondes}`, x + w/2, y + h/2);
}