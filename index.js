const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todoz",
    port: 3306,
});

db.connect(err => {
    if (err) {
        console.error('Greška prilikom povezivanja sa bazom:', err);
        return;
    }
    console.log('Povezan sa bazom!');
});

// Osnovna ruta
app.get("/", (req, res) => {
    res.send("Dobrodošao na backend!");
});

// GET taskovi za određenog korisnika
app.get("/taskovi", (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).send("Nedostaje userId");
    }

    const sql = 'SELECT * FROM taskovi WHERE korisnikov_id = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Greška pri dohvatanju taskova:', err);
            return res.status(500).send('Greška pri dohvatanju taskova');
        }
        res.json(results);
    });
});


app.get("/taskovi/:id", (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM taskovi WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Greška pri dohvatanju taska:', err);
            return res.status(500).send('Greška pri dohvatanju taska');
        }
        if (results.length === 0) {
            return res.status(404).send('Task nije pronađen');
        }
        res.json(results[0]);
    });
});


// POST dodavanje taska
app.post("/taskovi", (req, res) => {
    const { naslov, opis, korisnikov_id, kraj, deskripcija, tip_id, izvrsenje, napravljeno } = req.body;

    if (
        !naslov || !opis || !korisnikov_id ||
        !kraj || !deskripcija || tip_id === undefined ||
        izvrsenje === undefined || !napravljeno
    ) {
        return res.status(400).send('Svi podaci su obavezni');
    }

    const sql = 'INSERT INTO taskovi (naslov, opis, korisnikov_id, kraj, deskripcija, tip_id, izvrsenje, napravljeno) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [naslov, opis, korisnikov_id, kraj, deskripcija, tip_id, izvrsenje, napravljeno];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Greška pri dodavanju taska:', err);
            return res.status(500).send('Greška pri dodavanju taska');
        }
        res.status(201).send('Task je uspešno dodat!');
    });
});

// DELETE taska po id-u
app.delete("/taskovi/:id", (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM taskovi WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Greška pri brisanju taska:', err);
            return res.status(500).send('Greška pri brisanju taska');
        }
        res.send('Task je obrisan');
    });
});

// PUT update taska po id-u
app.put("/taskovi/:id", (req, res) => {
    const { id } = req.params;
    const { naslov, opis, korisnikov_id, kraj, deskripcija, tip_id } = req.body;

    if (!naslov && !opis && !korisnikov_id && !kraj && !tip_id && !deskripcija) {
        return res.status(400).send('Nijedan podatak nije poslat za ažuriranje');
    }

    let values = [];
    let query = 'UPDATE taskovi SET';

    if (naslov) {
        query += ' naslov = ?,';
        values.push(naslov);
    }
    if (opis) {
        query += ' opis = ?,';
        values.push(opis);
    }
    if (korisnikov_id) {
        query += ' korisnikov_id = ?,';
        values.push(korisnikov_id);
    }
    if (kraj) {
        query += ' kraj = ?,';
        values.push(kraj);
    }
    if (tip_id) {
        query += ' tip_id = ?,';
        values.push(tip_id);
    }
    if (deskripcija) {
        query += ' deskripcija = ?,';
        values.push(deskripcija);
    }

    query = query.slice(0, -1); // ukloni poslednji zarez
    query += ' WHERE id = ?';
    values.push(id);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Greška pri ažuriranju taska:', err);
            return res.status(500).send('Greška pri ažuriranju taska');
        }
        res.send('Task je uspešno ažuriran!');
    });
});

// GET pretraga po naslovu ili opisu
app.get("/search", (req, res) => {
    const searchTerm = req.query.term || '';
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).send("Nedostaje userId");
    }

    const searchValue = `%${searchTerm}%`;
    const sql = `
        SELECT * FROM taskovi 
        WHERE korisnikov_id = ? 
          AND (naslov LIKE ? OR opis LIKE ?)
    `;

    db.query(sql, [userId, searchValue, searchValue], (err, results) => {
        if (err) {
            console.error('Greška pri pretrazi:', err);
            return res.status(500).json({ error: 'Greška pri pretrazi' });
        }
        res.json(results);
    });
});

// GET sortiranje taskova
app.get("/orderby/:order", (req, res) => {
    const orderParams = req.params.order.toLowerCase();
    let query = 'SELECT * FROM taskovi';
    const validOrders = {
        'kraj_asc': ' ORDER BY kraj ASC',
        'kraj_desc': ' ORDER BY kraj DESC',
        'naslov_asc': ' ORDER BY naslov ASC',
        'naslov_desc': ' ORDER BY naslov DESC'
    };

    if (validOrders[orderParams]) {
        query += validOrders[orderParams];
    }

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// POST login (ili registracija ako korisnik ne postoji)
app.post("/login", async (req, res) => {
    const { username, sifra } = req.body;

    if (!username || !sifra) {
        return res.status(400).send("Username i šifra su obavezni.");
    }

    db.query('SELECT * FROM korisnik WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error("Greška pri traženju korisnika:", err.sqlMessage || err);
            return res.status(500).send("Greška na serveru.");
        }

        if (results.length > 0) {
            // Korisnik postoji, proveri šifru
            const korisnik = results[0];
            const match = await bcrypt.compare(sifra, korisnik.sifra);
            if (match) {
                return res.status(200).json({ id: korisnik.id });
            } else {
                return res.status(401).send("Pogrešna šifra.");
            }
        } else {
            // Kreiraj novog korisnika
            try {
                const hash = await bcrypt.hash(sifra, saltRounds);
                db.query(
                    'INSERT INTO korisnik (username, sifra) VALUES (?, ?)',
                    [username, hash],
                    (err, result) => {
                        if (err) {
                            console.error("Greška pri kreiranju korisnika:", err);
                            return res.status(500).send("Greška pri dodavanju korisnika.");
                        }
                        return res.status(201).json({ id: result.insertId });
                    }
                );
            } catch (e) {
                console.error("Greška pri hesiranju:", e);
                return res.status(500).send("Greška pri obradi šifre.");
            }
        }
    });
});

app.listen(3001, () => {
    console.log('Server radi na http://localhost:3001');
});
