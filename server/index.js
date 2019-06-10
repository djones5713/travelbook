// Dependencies 
require("dotenv").config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { register } = require('./controller/authController');


app.use(express.json())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db);
    console.log("Database Connected")
}).catch(err => console.log('CONNECTION', err))

app.use(
    session({
        saveUninitialized: false,
        resave: true,
        secret: SESSION_SECRET
    })
)

app.get('/api/travelbook/register', register)

const port = SERVER_PORT || 4000

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})