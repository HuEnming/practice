const getRandomName = require('./genName');
const getRandomAddress = require('./genAddress');
const getRandomOther = require('./genOther');
const getRandomPhone = require('./genPhone');
const { Address, Customer, Item, Order } = require('./model');

const insertCustomers = function () {
    // Get the customers collection
    //customers array
    const customerArray = [];
    for (var i = 0; i < 6; i++) {
        //get title, mobile and email
        const other = getRandomOther();
        //get first name and last name
        const name = getRandomName();
        //get a random address and insert it into address table as home address
        let homeAddress = getRandomAddress();;
        //console.log(homeAddress)
        //get a random address and insert it into address table as shipping address
        let shippingAddress = getRandomAddress();;
        //console.log(shippingAddress)
        //add the data into customer array
        Customer.create({
            title: other.title, first_name: name.firstName, last_name: name.lastName, mobile: other.mobile, email: other.email, home_line1: homeAddress.line1,
            home_line2: homeAddress.line2,
            home_town: homeAddress.town,
            home_city: homeAddress.city,
            home_eircode: homeAddress.eircode,
            shipping_line1: shippingAddress.line1,
            shipping_line2: shippingAddress.line2,
            shipping_town: shippingAddress.town,
            shipping_city: shippingAddress.city,
            shipping_eircode: shippingAddress.eircode
        })
    }
}

const insertItem = async function () {
    //get test data and insert into the database
    return await Item.insertMany(getRandomPhone())
    //.then(doc => { return doc }).catch(err => console.log(err))
}

const insertOrder = async function () {
    //find all items(phones)
    const phones = await Item.find().then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    });
    //find all customers
    const customers = await Customer.find().then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    });;
    //add an order for each customer
    customers.forEach(function (currentValue, index, arr) {
        //randomly set the item amount in the order
        const amount = Math.ceil(Math.random() * (phones.length - 1));
        const items = [];
        //add the phone's id into an array
        for (var j = 0; j < amount; j++) {
            const num = Math.floor(Math.random() * phones.length);
            items.push(phones[num]._id);
        }
        //add items array into order collection
        Order.create({ customer_id: currentValue._id, items: items }).then(doc => { return doc }).catch(err => console.log(err))
    })
}

const main = async function () {
    //create customers
    insertCustomers();
    //create items 
    let result = await insertItem();
    //create ordrs
    result = await insertOrder();
    console.log('Test data have been created');
}

main();

