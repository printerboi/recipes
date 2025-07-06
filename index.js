const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 🔁 URL-Rewrite: /recipes/recipes/xyz.md → /recipes/xyz.md
app.use((req, res, next) => {
  if (req.url.startsWith('/recipes/recipes/')) {
    req.url = req.url.replace('/recipes/recipes/', '/recipes/');
  }

  if (req.path === '/recipes/' || req.path === '/recipes') {
    return res.redirect('/');
  }
  next();
});

// 🌍 Statische Dateien aus dem Projekt-Root bereitstellen
app.use(express.static(__dirname));

// 🏠 Root-Route (optional, wenn index.html automatisch geladen werden soll)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});