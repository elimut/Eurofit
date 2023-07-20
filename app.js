const {app, port} = require('./serveur');
// recupération des modules serveur.js
const path = require('./route');
const cors = require('cors');

app.use(cors());
path.abonnementPath(app);
path.membrePath(app);
path.clubPath(app);

app.listen(port, ()=>{
    console.log(`Serveur is running on ${port}`);
});

// cors est un module qui facilite la gestion des requêtes Cross-Origin Resource Sharing (CORS) dans les applications web. CORS est un mécanisme de sécurité qui permet à un serveur de contrôler les requêtes provenant de domaines différents. Cela est particulièrement utile lorsque tu as une application frontend (par exemple, une application React ou Angular) qui communique avec une API backend.
// En utilisant cors, tu peux spécifier les configurations de politique de partage des ressources (Cross-Origin Resource Sharing) et autoriser les requêtes provenant de domaines spécifiques ouvertes à ton serveur.
// Voici comment tu peux l'utiliser dans ton code Node.js :
// Tout d'abord, tu dois installer la bibliothèque cors en exécutant la commande npm install cors dans ton répertoire de projet.
// Ensuite, tu dois l'importer dans ton code en utilisant require('cors').
// Une fois que tu as importé cors, tu peux l'utiliser en tant que middleware dans Express.js. Voici comment tu peux l'utiliser :
// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// n utilisant app.use(cors()), tu autorises toutes les requêtes provenant de n'importe quel domaine à accéder à tes ressources. Cela peut être pratique pendant le développement, mais tu peux également spécifier des options plus restrictives en passant un objet de configuration à cors(). Cela te permet de définir des règles spécifiques sur les origines autorisées, les méthodes HTTP permises, les en-têtes personnalisés, etc.