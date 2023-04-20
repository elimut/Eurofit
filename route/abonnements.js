// relatif à la table abonnements, composant pour abonnement
const {connection} = require('../serveur');
// récupération module connection du fichier serveur


/*Essai de get */
// app.get('/abonnement', (req, res)=>{
//     connection.query('SELECT * FROM abonnement;',(err, results)=>{
//         if (err) throw err;
//         res.json(results);
//     }); 
    // requete vers table abonnement
    // query: requête; , callback
// })
/*ou*/
// app.get('/abonnement:id', (req, res)=>{
    // binded id? rendre dynamique ?
    // connection.query('SELECT * FROM abonnement WHERE id = ?;', [id], (err, results)=>{
        // requête préparée []
        // if (err) throw err;
        // res.json(results);
    // }); 
    // requete vers table abonnement
    // query: requête; , callback
// })
/*faire un seul composant de ces deux parties -> dans fonction fléchée*/

const path = (app)=>{
    /* path fonction, revoir*/
/*Get pour la table abonnement*/
    app.get('/abonnement', (req, res)=>{
        connection.query('SELECT * FROM abonnement;',[], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    })

/*Get pour toutes tables définies dans le tableau tables, modifiable*/
    // const tables = [
    //     { name: 'abonnement', query: 'SELECT * FROM abonnement;' },
    //     { name: 'club', query: 'SELECT * FROM club;' },
    //     { name: 'membre', query: 'SELECT * FROM membre;' }
    //   ];

    //   app.get('/:table', (req, res) => {
    //     const tableName = req.params.table;
    //     const table = tables.find(t => t.name === tableName);
    //     /*array.find() est utilisée pour trouver un objet dans un tableau array qui a une propriété name égale à la valeur de la variable arrayName.
    //     la fonction de rappel utilisée est une fonction fléchée qui prend un argument t (un élément du tableau tables) et qui retourne true si la propriété name de t est égale à la valeur de la variable tableName. La méthode array.find() retourne le premier élément dans le tableau tables qui satisfait cette condition ou undefined si aucun élément ne satisfait la condition.*/
    //     if (!table) {
    //       throw new Error(`La table ${tableName} n'existe pas`);
    //     }
    //     connection.query(table.query, [], (err, results) => {
    //       if (err) {
    //         throw err;
    //       }
    //       res.json(results);
    //     });
    //   }); 

/*Get pour différentes tables avec if else*/
    // app.get('/:table', (req, res)=>{
    //     const table = req.params.table;
    //     if (table === 'abonnement') {
    //        requeteSqlGet = 'SELECT * FROM abonnement;' 
    //     } else if (table === 'club') {
    //         requeteSqlGet = 'SELECT * FROM club;' 
    //     } else if (table === 'membre') {
    //         requeteSqlGet = 'SELECT * FROM membre;' 
    //     } else{
    //         throw err;
    //     }
    //      connection.query(
    //         requeteSqlGet,
    //         [], 
    //         (err, results)=>{
    //         if (err)  throw err;
    //         res.json(results);
    //     })
    // })

/*Get pour table avec id spécifié pour afficher la ligne*/
    app.get('/abonnement/:id', (req, res)=>{
        const id_abonnement = req.params.id;
        connection.query('SELECT * FROM abonnement WHERE id_abonnement = ?;', [id_abonnement], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    });

/* Post, endpoint création nouvel abonnement, re voir les points de terminaison*/
    app.post('/abonnement', (req, res) =>{
        const {type, prix, bilan_IMC, acces_club} = req.body;
         connection.query('INSERT INTO abonnement(type, prix, bilan_IMC, acces_club) VALUES (?,?,?,?);',[type, prix, bilan_IMC, acces_club], (err, results)=>{
            if (err)   throw err;
            res.json(results);
        })
    })
    app.delete('/abonnement/:id', (req, res)=>{
        const id_abonnement = req.params.id;
        connection.query('DELETE FROM abonnement WHERE id_abonnement = ?', [id_abonnement], (err, results)=>{
            if (err)throw err;
            if (results.affectedRows === 0){
                res.status(404).send('Abonnement non trouvé');
            }
            else{
                res.status(200).json({ message: 'Abonnement supprimé avec succès'});
                // res.status(200).send('Abonnement supprimé avec succès');
                // Différence entre res.send et res.json dans Express.js: send, message sur interface, notamment page HTML, plutôt destiné à l' user sinon objet
            }
        })
    })
    app.put('/abonnement/:id', (req, res) =>{
        const id_abonnement = req.params.id;
        const {type, prix, bilan_IMC, acces_club} = req.body;
        // dans body 
         connection.query('UPDATE abonnement SET type = ?, prix = ?, bilan_IMC = ?, acces_club = ? WHERE id_abonnement = ?;',[type, prix, bilan_IMC, acces_club, id_abonnement], (err, results)=>{
            if (err)   throw err;
            res.json(results);
        });
    })
    app.patch('/abonnement/:id/:column', (req, res) =>{
        const id_abonnement = req.params.id;
        const column = req.params.column;
        let value = {};
        if (column === 'type') {
           requeteSql = 'UPDATE abonnement SET type = ? WHERE id_abonnement = ?;' 
           value = req.body.type
            // récupération valeur dans body de type? à spécifier
        } else if (column === 'prix') {
            requeteSql = 'UPDATE abonnement SET prix = ? WHERE id_abonnement = ?;'
            value = req.body.prix
        } else if (column === 'acces_club') {
            requeteSql = 'UPDATE abonnement SET acces_club = ? WHERE id_abonnement = ?;'
            value = req.body.acces_club
        } else if (column === 'bilan_IMC') {
            requeteSql = 'UPDATE abonnement SET bilan_IMC = ? WHERE id_abonnement = ?;'
            value = req.body.bilan_IMC
        } else{
           throw err;
        }
         connection.query(
            requeteSql,
            [value, id_abonnement], 
            (err, results)=>{
            if (err)  throw err;
            res.json(results);
        })
    })
    // Les méthodes PUT et PATCH ont des significations différentes : PUT, remplace les données par celle qui sont envoyées dans la requête. PATCH, permet la modification partielle d'une ressource en fusionnant les données envoyées avec les données déjà présentes ou grâce à l'utilisation d'opération de modification.
    
    // app.innerJoin('/abonnement/:id', (req, res) =>{
    //     const id_abonnement = req.params.id;
    //      connection.query('SELECT nom, type FROM  abonnement JOIN club WHERE id_abonnement.abonnement = club.id_club;',[type, prix, bilan_IMC, acces_club, id_abonnement], (err, results)=>{
    //         if (err)   throw err;
    //         res.json(results);
    //     })
    // })
}

module.exports = path;
// {} si plusieurs déstructuration

// dans thunder client: localhost:3000/abonnements
// pas de render car api, pas de front
// put tout modifier, patch une seule valeur


// Code sofian:
// const {connection} = require('../server');

// const path = (app)=>{
//   app.get('/abonnement', (req, res)=>{
//     connection.query('SELECT * FROM abonnement;', 
//     [],
//     (err, results)=>{
//       if (err) throw err;
//       res.json(results)
//     })
//   })

//   app.get('/abonnement/:id', (req, res)=>{
//     const id_abonnement = req.params.id;
//     connection.query('SELECT * FROM abonnement WHERE id_abonnement = ?;', 
//     [id_abonnement],
//     (err, results)=>{
//       if (err) throw err;
//       res.json(results)
//     })
//   })

//   app.post('/abonnement', (req, res) => {
//     const { titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif } = req.body;
    
//     if (!titre) {
//       res.status(400).json({ error: 'Le titre est obligatoire' });
//       return;
//     }
  
//     connection.query(
//       'INSERT INTO abonnement(titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
//       [titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif],
//       (error, data) => {
//         if (error) {
//           console.error(error);
//           res.status(500).send('Erreur du serveur');
//         } else {
//           res.status(201).json({ message: 'Abonnement créé avec succès' });
//         }
//       }
//     )
//   });
  
//   app.delete('/abonnement/:id', (req, res) => {
//     const id_abonnement = req.params.id;
//     connection.query('DELETE FROM abonnement WHERE id_abonnement = ?', [id_abonnement], (err, results) => {
//       if (err) throw err;
//       if(results.affectedRows === 0) {
//         res.status(404).send('Abonnement non trouvé');
//       } else {
//         res.status(200).json({ message: 'Abonnement supprimé avec succès'});
//       }
//     });
//   });
// }

// module.exports = path;