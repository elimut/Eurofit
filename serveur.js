const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;
// dot env pour garder les ports secrets, de façon générale il n' apparaisse pas dans l' URL utilisateur.
// port = soit port enregistré dans fichier soit 3000
// installation cors -> npm i cors

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'euro_fit_david'
});
// connection base de données



module.exports = {app, port, connection};
// export des modules, dans app seuls les deux premiers sont récupéré. Connextion sert pour les routes 
// création dossier route
