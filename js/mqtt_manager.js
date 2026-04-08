//import 'https://unpkg.com/mqtt/dist/mqtt.min.js';
import mqtt from 'https://cdn.jsdelivr.net/npm/mqtt@5.10.1/+esm';
// ON DÉFINIT ET ON EXPORTE L'ÉTAT EN UNE SEULE FOIS
export const mqttState = {
    color: "#00ffff",
    status: "Initialisation...",
    connected: false
};

const mapHex = {
    "Violette": "#800080",
    "Rouge": "#ff0000",
    "Bleu": "#0000ff",
    "Vert": "#00ff00",
    "Jaune": "#ffff00",
    "Mode Arc-en-ciel activé !": "#00ffff", 
    "LED éteinte": "#444444",
    "éteinte": "#444444"
};

const options = {
    clientId: 'web_dashboard_' + Math.random().toString(16).slice(2, 10),
    username: 'esp32-s3',
    password: 'Deckard38!',
};

const client = mqtt.connect('wss://d62f32b4a03348ea88f2dd1ab2b87b0d.s1.eu.hivemq.cloud:8884/mqtt', options);

client.on('connect', () => {
    mqttState.connected = true;
    client.subscribe('esp32/status');
    console.log("✅ MQTT Manager : Connecté");

    // DEMANDE D'ÉTAT INITIAL
    envoyerOrdre('esp32/led', 'get_status');
});

client.on('message', (topic, message) => {
    if (topic === 'esp32/status') {
        const text = message.toString();
        console.log("Accusé reçu :", text);

        // Nettoyage du message
        mqttState.status = text.replace("OK : LED est maintenant ", "");
        
        // Mise à jour de la couleur (on cherche dans mapHex)
        mqttState.color = mapHex[mqttState.status] || "#00ffff";
    }
});

// Fonction générique pour envoyer n'importe quel ordre
export function envoyerOrdre(topic, message) {
    if (client && client.connected) {
        client.publish(topic, message);
    }
}