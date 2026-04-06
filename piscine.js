// --- FICHIER piscine.js ---
import { dessiner_widget } from './utils.js';

let tempAir = "--", tempEau = "--", niveauEau = "--";

export async function majDonneesPiscine() {
    const channelID = "2787477";
    try {
        const [rA, rE, rN] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/4/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`)
        ]);
        const dataA = await rA.json();
        const dataE = await rE.json();
        const dataN = await rN.json();

        if (dataA.field1 !== null) tempAir = dataA.field1;
        if (dataE.field4 !== null) tempEau = dataE.field4;
        if (dataN.field5 !== null) niveauEau = dataN.field5;
    } catch (e) { console.error("Erreur Piscine:", e); }
}

majDonneesPiscine();
setInterval(majDonneesPiscine, 30000);

export function dessinerPiscine(ctx, x, y) {
    dessiner_widget(ctx, x, y, "piscine.svg", 
        `AIR : ${tempAir}°`, 
        `EAU : ${tempEau}°`, 
        `NIVEAU : ${niveauEau}`
    );
}