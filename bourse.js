import { dessiner_widget, lire_bourse } from './utils.js';

let coursAI = "--";

export async function majDonneesBourse() {
    coursAI = await lire_bourse("ai.pa");
    console.log(`[BOURSE] Air Liquide : ${coursAI} €`);
}

majDonneesBourse();
setInterval(majDonneesBourse, 600000); // 10 minutes

export function dessinerBourse(ctx, x, y) { 
    dessiner_widget(ctx, x, y, "bourse.svg", "AIR LIQUIDE", (coursAI === "--" ? "CHARGEMENT..." : `${coursAI} €`), "STOOQ REALTIME"); 
}