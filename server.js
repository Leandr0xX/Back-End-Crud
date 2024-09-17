const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Express Server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//SQL Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'products',
})

connection.connect();

//PARTE A

    //Ex1
        app.get('/productsA', (req, res) => {
            connection.query('SELECT * FROM product', function(err,rows,fields){
                if (err) throw err;
                
                res.send(rows);
            })
        });

    //Ex2
        app.post('/productsA', (req, res) => {
            var personBody = req.body;
            
            connection.query('INSERT product SET ?;', [personBody], function(err,rows,fields){
                if (err) throw err;
                
                res.send("Person: " + rows.insertId);
            })
        });
    
    //Ex3
        app.get('/productsA/search', (req, res) => {
            var sellerID = req.query;
            
            if (sellerID == undefined) {
                res.send("This seller doesn't exist! Try giving birth to them maybe?");
            }
            else{
                connection.query('SELECT * FROM product WHERE ?',[sellerID], function(err,rows,fields){
                    if (err) throw err;
                    
                    res.send(rows);
                })
            }
        });

    //Ex4
        app.put('/productsA/:id', (req, res) => {
            var id = req.params.id;
        
            if (id == undefined) {
            res.send("This person doesn't exist! Try giving birth to them maybe?");
            }
            else{
                connection.query('UPDATE product SET views = views + 1 WHERE id = ?;',[id], function(err,rows,fields){
                    if (err) throw err;
                    
                    connection.query('SELECT * FROM product WHERE id = ?',[id], function(err,rows,fields){
                        if (err) throw err;
                        
                        res.send(rows);
                    })    
                })
            }
        });

    //Ex5
        app.get('/productsAs', (req, res) => {
            var tagQuery = req.query.tags;

            connection.query('SELECT * FROM product WHERE tags LIKE ?',[tagQuery], function(err,rows,fields){
                if (err) throw err;
                
                res.send(rows);
            })
        });

//PARTE B

        //Ex1
            app.get('/productsB', (req, res) => {
                var idQuery = req.query.id;

                connection.query('SELECT * FROM product WHERE id = ?',[idQuery], function(err,rows,fields){
                    if (err) throw err;
                    
                    res.send(rows);
                })
            });

        //Ex2
            app.delete('/productsB/:id', (req, res) => {
                var id = req.params.id;
            
                if (id == undefined) {
                    res.send("This person doesn't exist! Try giving birth to them maybe?");
                }
                else{
                    connection.query('DELETE FROM product WHERE id = ?',[id] ,function(err,rows,fields){
                        if (err) throw err;
                        
                        res.send("Affected Rows: " + rows.affectedRows);
                    })
                }
            });

        //Ex3
            app.put('/productsB/:id', (req, res) => {
                var id = req.params.id;
                var imageBody = req.body.images;
                var splittedImageBody = imageBody.split(" ");

                if (id == undefined) {
                res.send("This person doesn't exist! Try giving birth to them maybe?");
                }
                else{
                    connection.query('UPDATE product SET images = ? WHERE id = ?;',[splittedImageBody,id], function(err,rows,fields){
                        if (err) throw err;
                        
                        connection.query('SELECT * FROM product WHERE id = ?',[id], function(err,rows,fields){
                            if (err) throw err;
                            
                            res.send(rows);
                        })
                    })
                }
            });

        //Ex4
            app.put('/productsBs', (req, res) => {
                var idQuery = req.query.id;
                var commentQuery = req.query.comments;

                if (idQuery == undefined) {
                res.send("This person doesn't exist! Try giving birth to them maybe?");
                }
                else{
                    connection.query('UPDATE product SET comments = ? WHERE id = ?;',[commentQuery,idQuery], function(err,rows,fields){
                        if (err) throw err;
                        
                        connection.query('SELECT * FROM product WHERE id = ?',[idQuery], function(err,rows,fields){
                            if (err) throw err;
                            
                            res.send(rows);
                        })
                    })
                }
            });

        //Ex5

            app.get('/productsB/search', (req, res) => {
                connection.query('SELECT * FROM product', function(err,rows,fields){
                    if (err) throw err;

                    rows.sort(function(a,b){
                        return a.views-b.views;
                    });

                    res.send(rows)
                })
            });