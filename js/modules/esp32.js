import { dessiner_widget_mqtt } from '../utils.js';
import { mqttState, envoyerOrdre } from '../mqtt_manager.js';

let listCouleurs = ["off", "violet", "rouge", "bleu", "vert", "jaune", "arcenciel"];
let indexCouleur = 0;

export function gererClicESP32(mouseX, mouseY, x, y) {
    if (mouseX >= x && mouseX <= x + 200 && mouseY >= y && mouseY <= y + 200) {
        indexCouleur = (indexCouleur + 1) % listCouleurs.length;
        envoyerOrdre('esp32/led', listCouleurs[indexCouleur]);
        return true;
    }
    return false;
}

export function dessinerESP32(ctx, x, y) {
    // Il pioche directement les infos dans mqttState
    dessiner_widget_mqtt(
        ctx, x, y, 
        "piscine.svg", 
        "ESP32-S3", 
        mqttState.status, 
        mqttState.connected ? "CLIQUEZ ICI" : "CONNEXION...", 
        mqttState.color
    );
}