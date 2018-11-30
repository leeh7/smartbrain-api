const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//handle signin
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

//create new user
//dependency injection to pass required parameters to handleRegister arrow func
app.post('/register', (req, res, ) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});
//image url endpoint to mask Clarifai API call and response activity on the backend/server
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});

app.listen(process.env.PORT || 3000, () =>{console.log(`app is running on port ${process.env.PORT}`)});