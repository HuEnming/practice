const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { customer, item, order } = require('./route')//import routers
const hbs =require('hbs');// use hbs view engine
const path =require('path');// use the path module (for views)

//require('./generateData')//generate test data

app.use(bodyParser.json())                          //  application/json
app.use(bodyParser.urlencoded({ extended: true }))  // application/x-www-form-urlencoded

app.set('views',path.join(__dirname,'views'));// set the views directory
app.set('view engine','hbs');// set the view engine to hbs
app.use('/assets',express.static(__dirname +'/public'));// set public folder as "static" for

//user customer router to deal with the url start with '/customer'
app.use('/customer', customer);
//user item router to deal with the url start with '/item'
app.use('/item', item);
//user order router to deal with the url start with '/order'
app.use('/order', order);

app.listen(3000, () => { console.log('Server listening on port 3000') });

/*
 Development and testing environment: Manjaro Linux, Firefox 74.0 (64-bit)

Some packages is needed when running the programe, you may need to execute npm install.

The MongoDB database is named ca6.There are 3 collections in the database, which are customers, items and orders.The structure of these collections are:
customers: _id, title, first_name, last_name, phone, email, home_address_id, shipping_address_id, home_line1, home_line2, home_town, home_city, home_eircode, shipping_line1, shipping_line2, shipping_town, shipping_city, shipping_eircode
items: _id, manufacturer, model, price
orders: _id, customer_id, items
The customer_id in orders connection is the _id in customers connection, and the item is an array of _id of items connection.
When running the program, some test data will generate form other js files like genAddress.js and genName.js.

When search the customers bu using keyword, it will match both first name and last name
When search the items bu using keyword, it will match both manufacture and model
*/