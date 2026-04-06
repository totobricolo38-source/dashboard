import { dessiner_widget, majDonneesPiscine_logic } from './utils.js'; // Optionnel : tu peux aussi isoler le fetch

let tempAir = "--", tempEau = "--", niveauEau = "--";

export async function majDonneesPiscine() {
    const channelID = "2787477";
    try {
        const [rA, rE, rN] = await Promise.all([
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/1/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/4/last.json`),
            fetch(`https://api.thingspeak.com/channels/${channelID}/fields/5/last.json`)
        ]);
        const [dA, dE, dN] = await Promise.all([rA.json(), rE.json(), rN.json()]);
        if (dA.field1 !== null) tempAir = dA.field1;
        if (dE.field4 !== null) tempEau = dE.field4;
        if (dN.field5 !== null) niveauEau = dN.field5;
    } catch (e) { console.error(e); }
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