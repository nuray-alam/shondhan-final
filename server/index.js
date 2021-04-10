const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'shondhansystem'
});

//Blood Donors Section
app.post('/createDonor', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const bloodGroup = req.body.bloodGroup;
    const donation_status = req.body.donation_status;
    const contact = req.body.contact;
    const address = req.body.address;

    db.query('INSERT INTO donors (name, age, gender, bloodGroup, donation_status, contact, address) VALUES (?,?,?,?,?,?,?)',
        [name, age, gender, bloodGroup, donation_status, contact, address],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send('values inserted')
            }
        })
});


app.get('/donors', (req, res) => {
    db.query('SELECT * FROM donors', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});


//Missing Posts Section


app.post('/createMissingPost', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const bloodGroup = req.body.bloodGroup;
    const contact = req.body.contact;
    const description = req.body.description;
    const address = req.body.address;

    db.query('INSERT INTO missing_posts (name, age, gender, bloodGroup, contact,description, address) VALUES (?,?,?,?,?,?,?)',
        [name, age, gender, bloodGroup, contact, description, address],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send('values inserted')
            }
        })
});


app.get('/missingPosts', (req, res) => {
    db.query('SELECT * FROM missing_posts', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

/// Update Status

app.put('/update', (req, res) => {
    const id = req.body.id;
    const donation_status = req.body.donation_status;
    db.query("UPDATE donors SET donation_status = ? WHERE id = ?", [donation_status, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

// Delete Missing Post


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM missing_posts WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})



app.listen(3001, () => {
    console.log('your server is running on port 3001');
})