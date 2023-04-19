// relatif à la table club
const {connection} = require('../serveur');
// récupération module connection du fichier serveur

const path = (app)=>{
    app.get('/club', (req, res)=>{
        connection.query('SELECT * FROM club;',[], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    })
    app.get('/club/:id', (req, res)=>{
        const id_club = req.params.id;
        connection.query('SELECT * FROM club WHERE id_club = ?;', [id_club], (err, results)=>{
            if (err) throw err;
            res.json(results);
        }); 
    });
    app.post('/club', (req, res) =>{
        const {nom, telephone,mail, licence} = req.body;
         connection.query('INSERT INTO club(nom, telephone,mail, licence) VALUES (?,?,?,?);',[nom, telephone,mail, licence], (err, results)=>{
            if (err)   throw err;
            res.json(results);
        })
    })
    // app.delete('/abonnement/:id', (req, res)=>{
    //     const id_abonnement = req.params.id;
    //     connection.query('DELETE FROM abonnement WHERE id_abonnement = ?', [id_abonnement], (err, results)=>{
    //         if (err)throw err;
    //         if (results.affectedRows === 0){
    //             res.status(404).send('Abonnement non trouvé');
    //         }
    //         else{
    //             res.status(200).json({ message: 'Abonnement supprimé avec succès'});
    //         }
    //     })
    // })
    // app.put('/abonnement/:id', (req, res) =>{
    //     const id_abonnement = req.params.id;
    //     const {type, prix, bilan_IMC, acces_club} = req.body;
    //      connection.query('UPDATE abonnement SET type = ?, prix = ?, bilan_IMC = ?, acces_club = ? WHERE id_abonnement = ?;',[type, prix, bilan_IMC, acces_club, id_abonnement], (err, results)=>{
    //         if (err)   throw err;
    //         res.json(results);
    //     })
    // })
    // app.patch('/abonnement/:id/:column', (req, res) =>{
    //     const id_abonnement = req.params.id;
    //     const column = req.params.column;
    //     let value = {};
    //     if (column === 'type') {
    //        requeteSql = 'UPDATE abonnement SET type = ? WHERE id_abonnement = ?;' 
    //        value = req.body.type
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
