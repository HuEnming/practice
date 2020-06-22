// Development and testing environment: Manjaro Linux, Firefox 74.0 (64-bit)

/*
MongoDB driver is needed when running the programe, you may need to execute npm install or npm install mongodb.
*/

const MongoClient = require('mongodb').MongoClient;
const getRandomName = require('./genName');
const getRandomAddress = require('./genAddress');
const getRandomOther = require('./genOther');
const getRandomPhone = require('./genPhone');

//connection information
const url = 'connection information';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//the entrance of the programe
const main = () => {
    //connect to the MongoDB server
    client.connect(async () => {
        console.log('Connected successfully to server');
        const db = client.db('ca5');
        console.log('----------Insert Customer Information-----------');
        //create customer data
        await insertCustomers(db);
        //create item(phone) data
        await insertItem(db);
        //create order data
        await insertOrder(db)
        //to solve the asynchronous problem, which makes the output in order.
        await new Promise(r => setTimeout(r, 1000));
        console.log('Randomly select a customer');
        //randomly find customers from the database
        let customer = await findCustomer(db);
        console.log('-----------Find Customer Information------------');
        await new Promise(r => setTimeout(r, 1000));
        //update customer's title , phone, email
        updateCustomer(db, customer[0]);
        await new Promise(r => setTimeout(r, 2000));
        console.log('----------Updated Customer Information----------');
        //output the updated customer information
        findCustomerById(db, customer[0]._id);
        await new Promise(r => setTimeout(r, 1000));
        console.log('-----------Delete Customer Information----------');
        //delete customer information and related address and orders
        deleteCustomer(db, customer[0].first_name);
        await new Promise(r => setTimeout(r, 1000));
        console.log('--------------Operations On Items---------------');
        //RUD functions on item, Create function has been executed already
        findItem(db);
        updateItem(db);
        deleteItem(db);
        await new Promise(r => setTimeout(r, 1000));
        console.log('--------------Operations On Orders--------------');
        //RUD functions on Order, Create function has been executed already
        findOrder(db, customer[1]._id);
        updateOrder(db, customer[1]._id);
        deleteOrder(db, customer[1]._id);
        await new Promise(r => setTimeout(r, 1000));
        //remove test data
        db.collection('addresses').deleteMany({});
        db.collection('customers').deleteMany({});
        db.collection('items').deleteMany({});
        db.collection('orders').deleteMany({});
        //colse the connection
        client.close();
    });
}

//insert 6 customers into the database
const insertCustomers = async function (db, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    //customers array
    const customerArray = [];
    for (var i = 0; i < 6; i++) {
        //get title, mobile and email
        const other = getRandomOther();
        //get first name and last name
        const name = getRandomName();
        //get a random address and insert it into address table as home address
        const homeAddress = await insertAddress(db, 'home');
        //get a random address and insert it into address table as shipping address
        const shippingAddress = await insertAddress(db, 'shipping');
        //add the data into customer array
        customerArray.push({ title: other.title, first_name: name.firstName, last_name: name.lastName, phone: other.mobile, email: other.email, home_address_id: homeAddress, shipping_address_id: shippingAddress, date_stamp: Date.parse(new Date()) })
    }

    // Insert documents
    collection.insertMany(customerArray, function (err, result) {
        if (err !== null)
            console.log(err, 'customer insertion failed')
        else
            console.log('Inserted ' + result.insertedCount + ' documents into the customers collection');
        //assert.equal(3, result.ops.length);
        //callback(result);
    });
}

//randomly get 2 customers form the database 1 for update and 1 for delete
const findCustomer = function (db, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    // Find a documents
    return new Promise(function (resolve, reject) {
        collection.find({}).toArray(async function (err, docs) {
            if (err === null) {
                //random function
                const num = Math.floor(Math.random() * (docs.length - 1));
                const customer = [docs[num], docs[num + 1]];
                findCustomerById(db, customer[0]._id, callback)
                resolve(customer)
            }
        });
    });
}

//find all customers from the database
const findCustomers = function (db, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    // Find documents
    return new Promise(function (resolve, reject) {
        collection.find({}).toArray(async function (err, docs) {
            if (err === null) {
                resolve(docs)
            }
        });
    });
}

//find a customer by using the customer id, and outputs the informations
const findCustomerById = function (db, id, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    // Find a document
    collection.aggregate([
        {//use $lookup (aggregation) get home address from addresses collection
            $lookup:
            {
                from: 'addresses',
                localField: 'home_address_id',
                foreignField: '_id',
                as: 'home_address'
            }
        }, {//use $lookup (aggregation) get home shipping from addresses collection
            $lookup:
            {
                from: 'addresses',
                localField: 'shipping_address_id',
                foreignField: '_id',
                as: 'shipping_address'
            }
        }, {//use $lookup (aggregation) get home orders from orders collection
            $lookup:
            {
                from: 'orders',
                localField: '_id',
                foreignField: 'customer_id',
                as: 'orders'
            }
        }
    ]).toArray(async function (err, docs) {
        if (err === null) {
            const customer = docs[0];
            console.log('Customer: ' + customer.first_name + ' ' + customer.last_name + ' (' + customer.title + ')');
            console.log('Phone: ' + customer.phone);
            console.log('Email: ' + customer.email);
            console.log('Home Address: ' + customer.home_address[0].line1 + ', ' + customer.home_address[0].line2 + ', ' + customer.home_address[0].town + ', ' + customer.home_address[0].city + ' (' + customer.home_address[0].eircode + ')');
            console.log('Shipping Address: ' + customer.shipping_address[0].line1 + ', ' + customer.shipping_address[0].line2 + ', ' + customer.shipping_address[0].town + ', ' + customer.shipping_address[0].city + ' (' + customer.shipping_address[0].eircode + ')');
            console.log('Order detail： ')
            if (customer.orders[0].items.length === 0)
                console.log('This customer has no order');
            else {
                //output all orders
                for (let i = 0; i < customer.orders.length; i++) {
                    //get phone information
                    const phones = await findItemsByIds(db, customer.orders[i].items);
                    console.log('Order ' + (i + 1) + ':')
                    for (let j = 0; j < phones.length; j++) {
                        console.log((j + 1) + ' ' + phones[j].manufacturer + ' ' + phones[j].model + ' ' + phones[j].price)
                    }
                }
            }
        } else
            console.log("Failed to found the records");
    });
}

//find some customers whose name, email, pbone can match a keyword
const findCustomersByKeyword = function (db, keyword, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    // Find some documents
    return new Promise(function (resolve, reject) {
        //matching the keyword
        collection.find({ $or: [{ first_name: keyword }, { last_name: keyword }, { phone: keyword }, { email: keyword }] }).toArray(async function (err, docs) {
            if (err === null) {
                resolve(docs)
            } else
                console.log("Failed to found the records");
        });
    });
}

//update a customer by using the old customer information
const updateCustomer = function (db, customer, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    //get new customers informations
    const other = getRandomOther();
    //update the information
    collection.updateOne({ _id: customer._id }
        , { $set: { title: other.title, phone: other.mobile, email: other.email, date_stamp: Date.parse(new Date()) } }, function (err, result) {
            if (err === null) {
                if (result.result.n === 1)
                    console.log('1 customer has been updated');
                //callback(result);
            }
        });
    //update the customer's shipping address
    updateAddress(db, customer.shipping_address_id);
}

//delete customers whose name, email, pbone can match a keyword
const deleteCustomer = async function (db, keyword, callback) {
    // Get the customers collection
    const collection = db.collection('customers');
    // find the matching customers 
    const customers = await findCustomersByKeyword(db, keyword);
    //delete their addresses and orders first
    customers.forEach(function (value) {
        deleteAddress(db, value.home_address_id);
        deleteAddress(db, value.shipping_address_id);
        deleteOrder(db, value._id)
    })
    //delete the customers then
    collection.deleteMany({ $or: [{ first_name: keyword }, { last_name: keyword }, { phone: keyword }, { email: keyword }] }, function (err, result) {
        if (err === null)
            console.log(result.result.n + ' customers were removed');
        else
            console.log(err, 'Address insertion failed')
    });
}

//insert an address into collection
const insertAddress = function (db, type, callback) {
    const collection = db.collection('addresses');
    //get a new addres randomly
    const address = getRandomAddress();
    return new Promise(function (resolve, reject) {
        // Insert document
        collection.insertMany([{ line1: address.line1, line2: address.line2, town: address.town, city: address.city, eircode: address.eircode, address_type: type }], function (err, result) {
            if (err !== null)
                console.log(err, 'Address insertion failed')
            else {
                console.log('Inserted ' + result.insertedCount + ' documents into the addresses collection');
            }
            resolve(result.insertedIds[0]);
        });
    });
}

//find an address from the database
const findAddress = function (db, id, callback) {
    // Get the addresses collection
    const collection = db.collection('addresses');
    return new Promise(function (resolve, reject) {
        // Find a document
        collection.find({ _id: id }).toArray(function (err, docs) {
            if (err === null) {
                resolve(docs[0]);
            } else
                console.log("Failed to found the records");
        });
    });
}

//update an address by using the id
const updateAddress = function (db, id, callback) {
    // Get the addresses collection
    const collection = db.collection('addresses');
    //get a random address and insert it into address table as shipping address
    const address = getRandomAddress();
    collection.updateOne({ _id: id }
        , { $set: { line1: address.line1, line2: address.line2, town: address.town, city: address.city, eircode: address.eircode } }, function (err, result) {
            if (err === null) {
                if (result.result.n === 1)
                    console.log("1 address has been updated");
            }
        });
}

//delete an address 
const deleteAddress = function (db, id, callback) {
    // Get the addresses collection
    const collection = db.collection('addresses');
    // Delete it
    collection.deleteOne({ _id: id }, function (err, result) {
        if (err === null) {
            if (result.result.n === 1)
                console.log("1 address has been deleted");
        }
        //callback(result);
    });
}

//insert some items into collection
const insertItem = function (db, callback) {
    const collection = db.collection('items');
    //get test data and insert into the database
    collection.insertMany(getRandomPhone(), function (err, result) {
        if (err !== null)
            console.log(err, 'Item insertion failed')
        else {
            console.log('Inserted ' + result.insertedCount + ' documents into the items collection');
        }
    })
}

//find an item from the database
const findItem = function (db, callback) {
    // Get the items collection
    const collection = db.collection('items');
    // Find some documents
    collection.find({ model: 'Galaxy A51 - 128 GB' }).toArray(function (err, docs) {
        if (err === null) {
            console.log("Manufacturer: " + docs[0].manufacturer + ", Model: " + docs[0].model + ", Price: " + docs[0].price);
        } else
            console.log("Failed to found the item records");
    });
}

//find items by a id array from the database
const findItemsByIds = function (db, ids, callback) {
    // Get the items collection
    const collection = db.collection('items');
    return new Promise(function (resolve, reject) {
        // Find the documents
        collection.find({ _id: { $in: ids } }).toArray(function (err, docs) {
            if (err === null) {
                resolve(docs);
            } else
                console.log("Failed to found the item records");
        });
    });
}

//find all items from the database
const findItems = function (db, callback) {
    // Get the items collection
    const collection = db.collection('items');
    return new Promise(function (resolve, reject) {
        // Find the documents
        collection.find({}).toArray(function (err, docs) {
            if (err === null) {
                resolve(docs);
            } else
                console.log("Failed to found the item records");
        });
    });
}

//update an item, the new information is hard coded
const updateItem = function (db, callback) {
    // Get the items collection
    const collection = db.collection('items');
    //update Galaxy A51 - 128 GB to HONOR 10 Lite - 64 GB
    collection.updateOne({ model: 'Galaxy A51 - 128 GB' }
        , { $set: { manufacturer: 'HONOR', model: '10 Lite - 64 GB', price: '€199.99' } }, function (err, result) {
            if (err === null) {
                if (result.result.n === 1)
                    console.log("item Galaxy A51 - 128 GB has been updated to 10 Lite - 64 GB");
            }
        });
}

//delete an item by using its id
const deleteItem = function (db, id, callback) {
    // Get the items collection
    const collection = db.collection('items');
    // Delete document Galaxy A40
    collection.deleteMany({ model: 'Galaxy A40 - 64 GB' }, function (err, result) {
        if (err === null) {
            console.log('Galaxy A51 has been deleted');
        }
        //callback(result);
    });
}

//insert some orders
const insertOrder = async function (db, callback) {
    const collection = db.collection('orders');
    //find all items(phones)
    const phones = await findItems(db);
    //find all customers
    const customers = await findCustomers(db);
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
        collection.insertMany([{ customer_id: currentValue._id, items: items }], function (err, result) {
            if (err !== null)
                console.log(err, 'Order insertion failed')
            else {
                console.log('Inserted ' + result.insertedCount + ' documents into the order collection');
            }
        })
    })
}

//find an order by customer id
const findOrder = function (db, id, callback) {
    // Get the orders collection
    const collection = db.collection('orders');
    // Find the documents
    collection.find({ customer_id: id }).toArray(async function (err, docs) {
        if (err === null) {
            const phone = await findItemsByIds(db, docs[0].items);
            console.log('Order information:')
            for (let j = 0; j < phone.length; j++) {
                console.log((j + 1) + ' ' + phone[j].manufacturer + ' ' + phone[j].model + ' ' + phone[j].price)
            }
        } else
            console.log('Failed to found the order records');
    });
}

//update an order by customer id
const updateOrder = function (db, id, callback) {
    // Get the orders collection
    const collection = db.collection('orders');
    collection.updateOne({ customer_id: id }
        , { $set: { items: [] } }, function (err, result) {
            if (err === null) {
                if (result.result.n === 1)
                    console.log("1 order has been updated");
            }
        });
}

//delete an order by customer id
const deleteOrder = function (db, id, callback) {
    // Get the orders collection
    const collection = db.collection('orders');
    // Delete document 
    collection.deleteMany({ customer_id: id }, function (err, result) {
        if (err === null) {
            console.log(result.result.n + ' order has been deleted');
        }
        //callback(result);
    });
}

main();

/*
The MongoDB database is named ca5.There are 4 collections in the database, which are addresses, addresses, items and items.The structure of these collections are:
addresses: _id, line1, line2, town, city, eircode, address_type;
customers: _id, title, first_name, last_name, phone, email, home_address_id, shipping_address_id, date_stamp
items: _id, manufacturer, model, price
orders: _id, customer_id, items
The home_address_id and shipping_address_id are used to connect customers collection and addresses connection, the customer_id in orders connection is the _id in customers connection, and the item is an array of _id of items connection.
When running the program, some test data will generate form other js files like genAddress.js and genName.js.
*/

