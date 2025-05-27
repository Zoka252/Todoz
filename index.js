const express=require("express");
const mysql = require('mysql2');
const cors=require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todoz",
    port:3306,
})

db.connect(err => {
    if (err){
        console.error('Greska', err);
        return;
}
    console.log('Povezan')
})

app.get("/", (req, res) => {
    res.send("Dobrodošao na backend!");
});

app.get("/taskovi", (req, res) => {
db.query('SELECT * FROM taskovi', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
    console.log(results);
});
});

app.get("/taskovi/:id", (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM taskovi WHERE id = ? ', [req.params.id],(err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
        console.log(results);
    });
});



app.post("/taskovi", (req, res) => {

    const {naslov,opis, korisnikov_id, kraj, deskripcija , tip_id, izvrsenje, napravljeno} = req.body;

    if (
        naslov === undefined || naslov === '' ||
        opis === undefined || opis === '' ||
        korisnikov_id === undefined ||
        kraj === undefined || kraj === '' ||
        deskripcija === undefined || deskripcija === '' ||
        tip_id === undefined ||
        izvrsenje === undefined ||
        napravljeno === undefined || napravljeno === ''
    ) {
        return res.status(400).send('Svi podaci su obavezni');
    }

    db.query(
        'INSERT INTO taskovi (naslov,opis, korisnikov_id, kraj,deskripcija, tip_id, izvrsenje, napravljeno) VALUES (?,?,?, ? , ?, ?, ?, ?)',
        [naslov, opis , korisnikov_id, kraj,deskripcija, tip_id,izvrsenje,napravljeno],
        (err, results) => {
            if (err) {
                console.error('Greska', err);
                return res.status(500).send('Greška pri dodavanju taska');
            }
            res.status(201).send('Task je uspešno dodat!');
        }
    );
})

app.delete("/taskovi/:id", (req, res) => {
    const {id} = req.params;
    db.query('DELETE FROM taskovi WHERE id = ?', [req.params.id],
        (err, results) => {
        if (err) {
            console.error('Greska pri brisanju', err)
            return res.status(500).send('Greska pri dodavanju taska');
        }
        res.send('Task je obrisan');
        })
})

app.put("/taskovi/:id", (req, res) => {
    const {id} = req.params;
    const {naslov,opis, korisnikov_id, kraj, deskripcija, tip_id} = req.body;

    if (!naslov && !opis && !korisnikov_id && !kraj && !tip_id && !deskripcija) {
        return res.status(400).send('Nijedan podatak nije poslat za azuriranje');
    }




    let values = [];
    let query = 'UPDATE taskovi SET';


    if (naslov){
        query += ' naslov = ?,';
        values.push(naslov);
    }
    if (opis){
        query += ' opis = ?,';
        values.push(opis);
    }
    if (korisnikov_id){
        query += ' korisnikov_id = ?,';
        values.push(korisnikov_id);
    }
    if (kraj){
        query += ' kraj = ?,';
        values.push(kraj);
    }
    if (tip_id){
        query += ' tip_id = ?,';
        values.push(tip_id);
    }
    if (deskripcija){
        query += ' deskripcija = ?,';
        values.push(deskripcija);
    }

    query = query.slice(0,-1)
    query += ' WHERE id = ?';
    values.push(id);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Greška pri ažuriranju', err);
            return res.status(500).send('Greška pri ažuriranju taska');
        }
        res.send('Task je uspešno ažuriran!');
    });

})

app.get("/search", (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400).json({error: 'Search term is required'});
    }
    const query = `SELECT * FROM taskovi WHERE naslov LIKE ? OR opis LIKE ?`;
    const searchValue = `%${searchTerm}%`

    db.query(query,[searchValue,searchValue], (err, results) => {
        if (err){
            console.error('Greska',err);
            return res.status(500),json({error: 'Search term is required'});

        }
        res.json(results);
    });
});

app.get("/orderby/:order", (req, res) => {
    const orderParams = req.params.order.toLowerCase(); // "kraj_asc", "naslov_desc"
    let query = 'SELECT * FROM taskovi';
    let orderUslov = '';

    // Dozvoljene kombinacije
    const validOrders = {
        'kraj_asc': ' ORDER BY kraj ASC',
        'kraj_desc': ' ORDER BY kraj DESC',
        'naslov_asc': ' ORDER BY naslov ASC',
        'naslov_desc': ' ORDER BY naslov DESC'
    };

    // Ako je validan parametar, dodaj ORDER BY
    if (validOrders[orderParams]) {
        orderUslov = validOrders[orderParams];
    }

    query += orderUslov;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


app.listen(3001, () => {
    console.log('Server radi na http://localhost:3001');
});