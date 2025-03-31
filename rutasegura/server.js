const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cliente'
});

app.get('/', (req, res) => {
    return res.json("Hello World");
});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM clientes", (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});