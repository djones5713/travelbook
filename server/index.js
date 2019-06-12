// Dependencies 
require("dotenv").config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
const checkSession = require('./middlewares/checkSession')
const travelController = require('./controller/travelController')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { createAccount, login, userInfo, logout } = require('./controller/authController');

// Middleware 
app.use(express.json())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db);
    console.log("Database Connected")
}).catch(err => console.log('CONNECTION', err))

app.use(
    session({
        saveUninitialized: false,
        resave: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
)

app.use(checkSession)

// Auth Endpoints
app.post('/api/travelbook/create-account', createAccount)
app.post('/api/travelbook/login', login)
// app.get('')

const port = SERVER_PORT || 4000

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})