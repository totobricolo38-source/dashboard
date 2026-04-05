export function dessinerHorloge(ctx, x, y) {
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(x, y, 200, 200);
  const h = new Date().toLocaleTimeString('fr', {hour:'2-digit', minute:'2-digit'});
  ctx.fillStyle = "#fff"; ctx.font = "bold 45px Arial"; ctx.textAlign = "center";
  ctx.fillText(h, x + 100, y + 110);
}