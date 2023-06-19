const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "helpdesk"
})
app.listen(port, () => {
    console.log('Sever is running on port ', port);
})
app.get('/helpdesk', (req, res) => {
    db.query("SELECT * FROM helpdesk", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.post('/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    const tel = req.body.tel;
    const email = req.body.email;
    const note = req.body.note;
    db.query(
        "INSERT INTO helpdesk (title, description, contact, tel, email,note) VALUES (?, ?, ?, ?, ?,?) ",
        [title, description, contact, tel, email, note],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
})
app.put('/upstatus/:id', (req, res) => {
    const { id } = req.params;
    const status = req.body.status;
    db.query(
        "UPDATE helpdesk SET status =?,time_update=null WHERE id = ?", [status, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    const tel = req.body.tel;
    const email = req.body.email;
    const note = req.body.note;
    db.query(
        "UPDATE helpdesk SET title =?, description =?,contact =?,tel =?,email =? ,note =?,time_update=null  WHERE id = ?",
        [title, description, contact, tel, email, note, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});