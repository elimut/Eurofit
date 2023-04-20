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
})

