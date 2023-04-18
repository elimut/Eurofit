// relatif à la table abonnements
const {connection} = require('../serveur');
// récupération module connection du fichier serveur

// app.get('/abonnement', (req, res)=>{
//     connection.query('SELECT * FROM abonnement;',(err, results)=>{
//         if (err) throw err;
//         res.json(results);
//     }); 
    // requete vers table abonnement
    // query: requête; , callback
// })
// ou
// app.get('/abonnement:id', (req, res)=>{
    // binded id?
    // connection.query('SELECT * FROM abonnement WHERE id = ?;', [id], (err, results)=>{
        // requête préparée []
        // if (err) throw err;
        // res.json(results);
    // }); 
    // requete vers table abonnement
    // query: requête; , callback
// })
// faire un seul composant de ces deux parties -> dans fonction fléchée
const path = (app)=>{
    app.get('/abonnement', (req, res)=>{
        connection.query('SELECT * FROM abonnement;',[], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    })
    // path fonction 
    app.get('/abonnement:id', (req, res)=>{
        const id_abonnement = req.params.id;
        connection.query('SELECT * FROM abonnement WHERE id_abonnement = ?;', [id_abonnement], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    })
    // endpoint création nouvel abonnement
    app.post('/abonnement', (req, res) =>{
        const {titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif} = req.body;
         connection.query('INSERT INTO abonnement(titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif) VALUES (?,?,?,?,?,?,?,?);',[titre, tout_club, toutes_salles, tout_pays, reduc_complement, reduc_medecine, reduc_coach, tarif], (err, results)=>{
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
                res.status(204).send('Abonnement supprimé avec succès');
            }
        })
    })
    app.patch('/abonnement/:id', (req, res)=>{
        const id_abonnement = req.params.id;
        connection.query('DELETE FROM abonnement WHERE id_abonnement = ?', [id_abonnement], (err, results)=>{
            if (err)throw err;
            if (results.affectedRows === 0){
                res.status(404).send('Abonnement non trouvé');
            }
            else{
                res.status(204).send('Abonnement supprimé avec succès');
            }
        })
    })
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