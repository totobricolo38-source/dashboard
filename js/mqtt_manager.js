import 'https://unpkg.com/mqtt/dist/mqtt.min.js';

// On définit les états partagés
export const mqttState = {
    status: "OFF",
    color: "#444444",
    connected: false
};

const mapHex = {
    "Violette": "#800080",
    "Rouge": "#ff0000",
    "Bleu": "#0000ff",
    "Vert": "#00ff00",
    "Jaune": "#ffff00",
    "Mode Arc-en-ciel activé !": "#00ffff", 
    "LED éteinte": "#444444"
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
});

client.on('message', (topic, message) => {
    if (topic === 'esp32/status') {
        const text = message.toString();
        console.log("Accusé reçu :", text); // Pour vérifier dans la console

        // On nettoie le message pour ne garder que le nom de la couleur
        // Si l'ESP envoie "OK : LED est maintenant Violette"
        mqttState.status = text.replace("OK : LED est maintenant ", "");
        
        // On met à jour la couleur du thème
        mqttState.color = mapHex[mqttState.status] || "#00ffff";
    }
});

// Fonction générique pour envoyer n'importe quel ordre
export function envoyerOrdre(topic, message) {
    if (mqttState.connected) {
        client.publish(topic, message);
    }
}