let t = 0;
const c = (ctx, x, y, r, cl) => { ctx.fillStyle = cl; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); };

export function dessinerMeteo(ctx, x, y) {
  ctx.strokeStyle = "#fff"; ctx.strokeRect(x, y, 200, 200);
  t += 0.02;
  c(ctx, x + 100, y + 70, 35, "yellow"); // Soleil
  const s = (f, o = 0) => y + 130 + o + Math.sin(t * f) * 5;
  c(ctx, x + 75, s(1), 25, "rgba(200,200,200,0.8)");   // Gauche
  c(ctx, x + 125, s(1.3), 25, "rgba(200,200,200,0.8)"); // Droite
  c(ctx, x + 100, s(1.7, -15), 30, "#fff");             // Sommet
}