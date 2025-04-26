const express=require("express");
const mysql = require('mysql2');
const cors=require("cors");

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

app.post("/taskovi", (req, res) => {

    const {naslov,opis, korisnikov_id, kraj, tip_id} = req.body;

    if (!naslov || !opis || !korisnikov_id || !kraj || !tip_id) {
        return res.status(400).send('Svi podaci su obavezni');
    }

    db.query(
        'INSERT INTO taskovi (naslov,opis, korisnikov_id, kraj, tip_id) VALUES (?, ? , ?, ?, ?)',
        [naslov, opis , korisnikov_id, kraj, tip_id],
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
    const {naslov,opis, korisnikov_id, kraj, tip_id} = req.body;

    if (!naslov && !opis && !korisnikov_id && !kraj && !tip_id ) {
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



app.listen(3001, () => {
    console.log('Server radi na http://localhost:3001');
});