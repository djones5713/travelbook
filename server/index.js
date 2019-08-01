// Dependencies 
require("dotenv").config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
const checkSession = require('./middlewares/checkSession');
const bodyParser = require('body-parser');

app.use(bodyParser.json())


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { createAccount, login, userInfo, logout, cloud } = require('./controller/authController');
const {  getDestinations, searchDestinations, getUserDestination,  updateDestination,  addDestination, deleteDestination} = require('./controller/destinationsController');


app.use( express.static( `${__dirname}/../build` ) );


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
app.get('/api/travelbook/user', userInfo)
app.get('/api/travelbook/logout', logout)

// Explore Endpoints
app.get('/api/travelbook/destinations', getDestinations)
app.get('/api/travelbook/destinations/:region/:country',  searchDestinations)
// app.post('/api/travelbook/destination', createDestination)

// User Destination Endpoints 
app.get('/api/travelbook/user-destinations', getUserDestination)
app.put('/api/travelbook/user-destinations/:id/:user_id', updateDestination)
//NOTE:http://localhost:3001/api/travelbook/user-destinations/4?date=2019-08-10
app.post('/api/travelbook/user-destinations-list',  addDestination)
app.delete('/api/travelbook/user-destinations/:id/:user_id', deleteDestination)
app.get('/api/upload', cloud)

//NOTE:http://localhost:3001/api/travelbook/user-destinations/2

const port = SERVER_PORT || 4001

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})

const path = require('path'); // Usually moved to the start of file

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});