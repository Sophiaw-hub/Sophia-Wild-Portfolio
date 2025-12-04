const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // kannst du auch ändern

// Middleware: JSON-Body parsen
app.use(express.json());

// Statische Dateien deines Frontends ausliefern
// Passe den Pfad zu deinem "src"-Ordner an:
app.use(express.static(path.join(__dirname, "..", "src")));

// Beispiel-API-Route (Frontend kann später darauf zugreifen)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hallo vom Node.js-Server! 😎" });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
