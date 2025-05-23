const fs = require('fs');
const path = require('path');
const https = require('https');

// Créer un mapping des joueurs avec des URLs d'images réelles
const playerImages = [
  { id: 1, name: "Kylian Mbappé", url: "https://img.a.transfermarkt.technology/portrait/big/342229-1602849394.jpg", filename: "mbappe.jpg" },
  { id: 2, name: "Erling Haaland", url: "https://img.a.transfermarkt.technology/portrait/big/418560-1656179352.jpg", filename: "haaland.jpg" },
  { id: 3, name: "Jude Bellingham", url: "https://img.a.transfermarkt.technology/portrait/big/581678-1686217325.jpg", filename: "bellingham.jpg" },
  { id: 4, name: "Vinicius Jr", url: "https://img.a.transfermarkt.technology/portrait/big/371998-1661509284.jpg", filename: "vinicius.jpg" },
  { id: 5, name: "Rodri", url: "https://img.a.transfermarkt.technology/portrait/big/357565-1668165786.jpg", filename: "rodri.jpg" },
  { id: 6, name: "Virgil van Dijk", url: "https://img.a.transfermarkt.technology/portrait/big/139208-1620651710.jpg", filename: "vandijk.jpg" },
  { id: 7, name: "Thibaut Courtois", url: "https://img.a.transfermarkt.technology/portrait/big/108390-1661509349.jpg", filename: "courtois.jpg" },
  { id: 8, name: "Kevin De Bruyne", url: "https://img.a.transfermarkt.technology/portrait/big/88755-1668165786.jpg", filename: "debruyne.jpg" }
];

const IMAGES_DIR = path.join(__dirname, '../src/assets/images/players');

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Télécharger les images pour chaque joueur
playerImages.forEach(player => {
  const filePath = path.join(IMAGES_DIR, player.filename);
  
  // Télécharger l'image
  const file = fs.createWriteStream(filePath);
  https.get(player.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Image téléchargée pour ${player.name}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {});
    console.error(`Erreur lors du téléchargement de l'image pour ${player.name}:`, err.message);
  });
});

// Charger le fichier JSON existant
const jsonPath = path.join(__dirname, '../src/assets/fake-data/players.json');
let players = [];

try {
  const jsonData = fs.readFileSync(jsonPath, 'utf8');
  players = JSON.parse(jsonData);
  
  // Mettre à jour les chemins d'images dans le JSON
  players.forEach(player => {
    const playerImage = playerImages.find(img => img.id === player.id);
    if (playerImage) {
      player.photo = `assets/images/players/${playerImage.filename}`;
    }
  });
  
  // Sauvegarder le fichier JSON mis à jour
  fs.writeFileSync(jsonPath, JSON.stringify(players, null, 2));
  console.log('Fichier JSON mis à jour avec les nouveaux chemins d\'images');
  
} catch (error) {
  console.error('Erreur lors de la mise à jour du fichier JSON:', error.message);
}

console.log('Téléchargement des images terminé!');


