import { dessiner_widget, lire_api } from '../utils.js';

let tAir = "--", tEau = "--", nEau = "--";
const BASE = "https://api.thingspeak.com/channels/2787477/fields/";

export async function majDonneesPiscine() {
    // On passe le lien direct pour chaque valeur
    tAir = await lire_api(`${BASE}1/last.json`, "field1");
    tEau = await lire_api(`${BASE}4/last.json`, "field4");
    nEau = await lire_api(`${BASE}5/last.json`, "field5");
}

majDonneesPiscine();
setInterval(majDonneesPiscine, 30000);

export function dessinerPiscine(ctx, x, y) {
    dessiner_widget(ctx, x, y, "piscine.svg", `AIR : ${tAir}°`, `EAU : ${tEau}°`, `NIVEAU : ${nEau}`);
}