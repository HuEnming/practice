const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { client, therapist, session } = require('./routes/route')//import routers
const hbs = require('hbs');// use hbs view engine
const path = require('path');// use the path module (for views)
const cors = require('cors');
app.use(cors());

//require('./generateData')//generate test data

app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // application/x-www-form-urlencoded

app.set('views', path.join(__dirname, '/views'));// set the views directory
app.set('view engine', 'hbs');// set the view engine to hbs
app.use('/assets', express.static(__dirname + '/views/public'));// set public folder as "static" for

//user customer router to deal with the url start with '/customer'
//user item router to deal with the url start with '/item'
app.use('/client', client);
app.use('/therapist', therapist);
app.use('/session', session);
//user order router to deal with the url start with '/order'
//app.use('/order', order);

app.listen(3001, () => { console.log('Server listening on port 3000') });

/*
 Development and testing environment: Manjaro Linux, Firefox 74.0 (64-bit)

Some packages is needed when running the programe, you may need to execute npm install.

The MongoDB database is named exame.There are 3 collections in the database, which are clients, sessions and therapists.The structure of these collections are:
clients: _id，registered_date，marital_status，title，first_name，surname，mobile_phone，home_phone，email_address，address_line1，address_line2，
town，city，eircode，date_of_birth，guardian_name，permission，referred_by，createdAt，updatedAt

sessions:_id，clients，session_date，session_time，therapist，fee，session_number，session_duration
session_type，issue_flag，session_notes，createdAt，updatedAt

therapists: _id，title，first_name，surname，mobile_phone，home_phone，email_address，ddress_line1
，address_line2，town，city，eircode，createdAt，updatedAt


When search the clients and therapists by using keyword, it will match both first name and surname
When search the sessions by using keyword, it will match therapists's first name and surname

select the dropdown list and then click the search button to jump to other routes.
*/