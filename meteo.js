// meteo.js

// Variables pour l'animation du nuage
let xNuage = 100;
let direction = 1;

export function dessinerMeteoDynamique(ctx) {
  const canvas = ctx.canvas;

  // 1. Fonction de dessin principale (ton ancien code)
  function dessiner() {
    // Effacer le canvas à chaque image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- LE SOLEIL ---
    ctx.fillStyle = "#FFD700"; // Jaune or
    ctx.beginPath();
    ctx.arc(150, 100, 50, 0, Math.PI * 2); // Corps
    ctx.fill();

    // Rayons (boucle simple)
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 4;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(150, 100);
      // Calcul des coordonnées pour les rayons
      const angle = (i * Math.PI) / 6;
      const xEnd = 150 + Math.cos(angle) * 80;
      const yEnd = 100 + Math.sin(angle) * 80;
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();
    }

    // --- LE NUAGE (animé) ---
    // Mise à jour de la position
    xNuage += 0.5 * direction;
    // Rebondir sur les bords
    if (xNuage > canvas.width - 100 || xNuage < 50) {
      direction *= -1;
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // Blanc semi-transparent
    const yNuage = 150;

    // Dessin du nuage (assemblage de cercles)
    ctx.beginPath();
    ctx.arc(xNuage, yNuage, 30, 0, Math.PI * 2); // Gauche
    ctx.arc(xNuage + 40, yNuage, 40, 0, Math.PI * 2); // Centre
    ctx.arc(xNuage + 80, yNuage, 30, 0, Math.PI * 2); // Droite
    ctx.arc(xNuage + 40, yNuage - 30, 30, 0, Math.PI * 2); // Haut
    ctx.fill();

    // 2. Lancer la boucle d'animation
    requestAnimationFrame(dessiner);
  }

  // Démarrer l'animation une première fois
  dessiner();
}