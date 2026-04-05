export function dessinerCercle(ctx) {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Module Météo OK", 120, 210);
}