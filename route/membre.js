// relatif à la table membre, composant pour membre
const {connection} = require('../serveur');


const path = (app)=>{
    app.get('/membre', (req, res)=>{
        connection.query('SELECT m.nom, m.prenom, m.mail, m.telephone, a.type FROM membre m INNER JOIN abonnement a ON a.id_abonnement = m.id_membre ;',[], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    })

    app.get('/membre/:id', (req, res)=>{
        const id_membre = req.params.id;
        connection.query('SELECT * FROM membre WHERE id_membre = ?;', [id_membre], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    });

    // app.post('/membre', (req, res) =>{
    //     const {type, prix, bilan_IMC, acces_club} = req.body;
    //      connection.query('INSERT INTO membre(type, prix, bilan_IMC, acces_club) VALUES (?,?,?,?);',[type, prix, bilan_IMC, acces_club], (err, results)=>{
    //         if (err)   throw err;
    //         res.json(results);
    //     })
    // })
    app.delete('/membre/:id', (req, res)=>{
        const id_membre = req.params.id;
        connection.query('DELETE FROM membre WHERE id_membre = ?', [id_membre], (err, results)=>{
            if (err)throw err;
            if (results.affectedRows === 0){
                res.status(404).send('membre non trouvé');
            }
            else{
                res.status(200).json({ message: 'membre supprimé avec succès'});
            }
        })
    })
    // app.put('/abonnement/:id', (req, res) =>{
    //     const id_abonnement = req.params.id;
    //     const {type, prix, bilan_IMC, acces_club} = req.body;
    //     // dans body 
    //      connection.query('UPDATE abonnement SET type = ?, prix = ?, bilan_IMC = ?, acces_club = ? WHERE id_abonnement = ?;',[type, prix, bilan_IMC, acces_club, id_abonnement], (err, results)=>{
    //         if (err)   throw err;
    //         res.json(results);
    //     });
    // })
    // app.patch('/abonnement/:id/:column', (req, res) =>{
    //     const id_abonnement = req.params.id;
    //     const column = req.params.column;
    //     let value = {};
    //     if (column === 'type') {
    //        requeteSql = 'UPDATE abonnement SET type = ? WHERE id_abonnement = ?;' 
    //        value = req.body.type
    //         // récupération valeur dans body de type? à spécifier
    //     } else if (column === 'prix') {
    //         requeteSql = 'UPDATE abonnement SET prix = ? WHERE id_abonnement = ?;'
    //         value = req.body.prix
    //     } else if (column === 'acces_club') {
    //         requeteSql = 'UPDATE abonnement SET acces_club = ? WHERE id_abonnement = ?;'
    //         value = req.body.acces_club
    //     } else if (column === 'bilan_IMC') {
    //         requeteSql = 'UPDATE abonnement SET bilan_IMC = ? WHERE id_abonnement = ?;'
    //         value = req.body.bilan_IMC
    //     } else{
    //         throw err;
    //     }
    //      connection.query(
    //         requeteSql,
    //         [value, id_abonnement], 
    //         (err, results)=>{
    //         if (err)  throw err;
    //         res.json(results);
    //     })
    // })
}

module.exports = path;
