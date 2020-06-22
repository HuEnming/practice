const express = require('express');
//import models
const { Customer, Item, Order } = require('./model');
//create customer router
const customer = express.Router();
//get all customers

customer.get('/', (req, res) => {
    Customer.find()
        .then(data => {
            res.render('customer_view', {
                results: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all customer."
            });
        });
});
//get customer by key word
customer.get('/:key', (req, res) => {
    var keyword = req.params.key;
    Customer.find({
        $or: [//match first name and last name
            { first_name: { $regex: new RegExp(keyword, "ig") } },
            { last_name: { $regex: new RegExp(keyword, "ig") } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Customer not found with keyword " + req.params.key
                });
            }
            // res.setHeader("Content-Type", "application/json;charset=utf-8");
            // res.send(data);
            res.render('customer_view', {
                results: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with keyword " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Error retrieving Customer with keyword " + req.params.id
            });
        });
});
//add a customer
customer.post('/', async (req, res) => {
    //const { title, first_name, last_name, mobile, email, home_address_id, shipping_address_id } = req.body;
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty!"
        });
    }
    // Create a new customer (using schema)
    const newCustomer = new Customer(
        req.body
    );
    // Save Customer in the database
    newCustomer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Customer."
            });
        });
});
//update customer by id
customer.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Customer content cannot be empty"
        });
    }

    // Find the Customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating customer with id " + req.params.id + err
            });
        });
});
//delete customer by id
customer.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            res.send({ message: "Customer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete customer with id " + req.params.id + err
            });
        });
});
//get all items
const item = express.Router();
item.get('/', (req, res) => {
    Item.find()
        .then(data => {
            res.render('item_view', {
                results: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all item."
            });
        });
});
//get item by keyword
item.get('/:key', (req, res) => {
    var keyword = req.params.key;
    Item.find({
        $or: [//match manufacturer manufacturer
            { manufacturer: { $regex: new RegExp(keyword, "ig") } },
            { model: { $regex: new RegExp(keyword, "ig") } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            res.render('item_view', {
                results: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving item with id " + req.params.id + err
            });
        });
});
//add an item
item.post('/', (req, res) => {
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Item content cannot be empty!"
        });
    }
    // Create a new item (using schema)
    const newItem = new Item(
        req.body
    );
    // Save item in the database
    newItem.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the item."
            });
        });
});
//update an item
item.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Item content cannot be empty"
        });
    }

    // Find the item and update it with the request body
    Item.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating item with id " + req.params.id + err
            });
        });
});
//delete an item
item.delete('/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            res.send({ message: "Item deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Item not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete item with id " + req.params.id + err
            });
        });
});
//get all orders
const order = express.Router();
order.get('/', (req, res) => {
    Order.find().populate('customer_id').populate('items')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all item."
            });
        });
});
//get an order by id
order.get('/:id', (req, res) => {
    Order.findById(req.params.id).populate('customer_id').populate('items')
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.id + err
            });
        });
});
//add an order
order.post('/', (req, res) => {
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Irder content cannot be empty!"
        });
    }
    // Create a new item (using schema)
    const newOrder = new Order(
        req.body
    );
    // Save item in the database
    newOrder.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the order."
            });
        });
});
//update an order
order.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Order content cannot be empty"
        });
    }

    // Find the item and update it with the request body
    Order.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating order with id " + req.params.id + err
            });
        });
});
//delete an order
order.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send({ message: "Order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id " + req.params.id + err
            });
        });
});

module.exports = { item, order, customer }