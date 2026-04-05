let xO = 0;
const cercle = (ctx, x, y, r, c) => {
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
};

export function dessinerMeteo(ctx, x, y) {
  ctx.strokeStyle = "white"; ctx.strokeRect(x, y, 200, 200);
  const cx = x + 100, cy = y + 100;
  
  cercle(ctx, cx, cy - 30, 35, "yellow"); // Soleil

  xO += 0.04;
  const nx = cx + Math.sin(xO) * 25;
  cercle(ctx, nx - 25, cy + 30, 25, "rgba(200,200,200,0.8)");
  cercle(ctx, nx + 25, cy + 30, 25, "rgba(200,200,200,0.8)");
  cercle(ctx, nx, cy + 15, 30, "white");
}