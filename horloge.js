export function dessinerHorloge(ctx, x, y) {
  ctx.strokeStyle = "white"; ctx.strokeRect(x, y, 200, 200);
  const h = new Date().toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
  
  ctx.fillStyle = "white";
  ctx.font = "bold 45px Arial";
  ctx.textAlign = "center";
  ctx.fillText(h, x + 100, y + 110);
}