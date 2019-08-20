// Dependencies 
require("dotenv").config();
const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
const checkSession = require('./middlewares/checkSession');
const bodyParser = require('body-parser');
const cors = require("cors");
const stripe = require("stripe")("sk_test_ntx88ikFuNLhLGTcCOt79LJW004r8KY4Hv");
const uuid = require("uuid/v4");


app.use(bodyParser.json())


const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const { createAccount, login, userInfo, logout, cloud } = require('./controller/authController');
const {  getDestinations, searchDestinations, getUserDestination,  updateDestination,  addDestination, deleteDestination} = require('./controller/destinationsController');

app.use( express.static( `${__dirname}/../build` ) );


// Middleware 
app.use(express.json())
app.use(cors())

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

// Payment Endpoints 
app.get( "/", (req, res) => {res.send("Add your Stripe Key to require('stripe) statement!")})

app.post('/checkout', async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { product, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
        } catch (error) {
        console.error("Error:", error);
        status = "failure";
        }
        res.json({error, status})
})

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