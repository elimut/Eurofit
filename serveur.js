const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;
// dot env pour garder les ports secrets, de façon générale ils n' apparaissent pas dans l' URL utilisateur.
// port = soit port enregistré dans fichier soit 3000
// installation cors -> npm i cors
// Donc process.env.PORT || 3000signifie : tout ce qui est dans la variable d'environnement PORT, ou 3000 s'il n'y a rien

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// Cette ligne configure body-parser pour analyser les données envoyées avec les requêtes HTTP contenant des URL encodées. Cela signifie que lorsque tu envoies des données à ton serveur via une requête POST ou PUT, ces données peuvent être envoyées au format x-www-form-urlencoded, qui est un format couramment utilisé pour soumettre des formulaires HTML.
// extended: true indique à body-parser de prendre en charge des fonctionnalités étendues du format x-www-form-urlencoded. Cela permet notamment de traiter les tableaux ou les objets complexes dans les données envoyées.
app.use(bodyParser.json());
// Cette ligne configure body-parser pour analyser les données envoyées avec les requêtes HTTP au format JSON. Lorsque tu envoies des données JSON avec une requête POST ou PUT, body-parser sera responsable de les analyser et de les rendre accessibles dans ton code sous forme d'objets JavaScript. En utilisant ces deux lignes de code, tu peux traiter les données envoyées dans le corps des requêtes HTTP, qu'elles soient au format x-www-form-urlencoded ou JSON. Cela te permet de récupérer facilement ces données dans ton code serveur et de les utiliser pour effectuer des opérations ou les stocker dans une base de données, par exemple.

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'euro_fit_david'
});
// connection base de données



module.exports = {app, port, connection};
// export des modules, dans app seuls les deux premiers sont récupéré. Connection sert pour les routes 
// création dossier route
