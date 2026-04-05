export async function recupererPrix() {
  const url = "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?where=ville%3D%22COUBLEVIE%22&limit=1";
  try {
    const res = await fetch(url);
    const data = await res.json();
    const carburant = data.results[0].prix.find(p => p.nom === "SP95");
    return carburant.valeur;
  } catch (e) { return "1.999"; }
}

export function dessinerEssence(ctx, x, y, prix) {
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(x, y, 200, 200);
  ctx.fillStyle = "#fff"; ctx.textAlign = "center";
  ctx.font = "bold 25px Arial"; ctx.fillText("SP95", x + 100, y + 80);
  ctx.font = "bold 45px Arial"; ctx.fillText(`${prix}€`, x + 100, y + 140);
}