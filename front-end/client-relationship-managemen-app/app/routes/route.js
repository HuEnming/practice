const express = require('express');
//import models
const { Client, Therapist, Session } = require('../models/model');
//create client router
const client = express.Router();
const therapist = express.Router();
const session = express.Router();
//get all client

client.get('/', (req, res) => {
    Client.find()
        .then(data => {
            res.render('client_view', {
                results: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all client."
            });
        });
});

client.get('/:key', (req, res) => {
    var keyword = req.params.key;
    Client.find({
        $or: [//match first name and last name
            { first_name: { $regex: new RegExp(keyword, "ig") } },
            { surname: { $regex: new RegExp(keyword, "ig") } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Client not found with keyword " + req.params.key
                });
            }
            // res.setHeader("Content-Type", "application/json;charset=utf-8");
            // res.send(data);
            res.render('client_view', {
                results: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found with keyword " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Error retrieving Client with keyword " + req.params.id
            });
        });
});
//add a client
client.post('/', async (req, res) => {
    //const { title, first_name, last_name, mobile, email, home_address_id, shipping_address_id } = req.body;
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Client content cannot be empty!"
        });
    }
    //check age
    var now = new Date();
    var birthday = new Date(req.body.date_of_birth)
    if ((Math.floor((now.getTime() - birthday.getTime()) / (24 * 3600 * 1000)) / 365 < 18) && req.body.guardian_name===""){
        return res.status(400).send({
            message: "Guardian name cannot be empty!"
        });
    }
        // Create a new client (using schema)
        const newClient = new Client(
            req.body
        );
    // Save client in the database
    newClient.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Client."
            });
        });
});
//update client by id
client.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Client content cannot be empty"
        });
    }
    //check age
    var now = new Date();
    var birthday = new Date(req.body.date_of_birth)
    
    if ((Math.floor((now.getTime() - birthday.getTime()) / (24 * 3600 * 1000)) / 365 < 18) && req.body.guardian_name===""){
        return res.status(400).send({
            message: "Guardian name cannot be empty!"
        });
    }

    // Find the client and update it with the request body
    Client.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating client with id " + req.params.id + err
            });
        });
});
//delete client by id
client.delete('/:id', (req, res) => {
    Client.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.id
                });
            }
            res.send({ message: "client deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete client with id " + req.params.id + err
            });
        });
});

therapist.get('/', (req, res) => {
    Therapist.find()
        .then(data => {
            res.render('therapist_view', {
                results: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all therapist."
            });
        });
});

therapist.get('/:key', (req, res) => {
    var keyword = req.params.key;
    Therapist.find({
        $or: [//match first name and last name
            { first_name: { $regex: new RegExp(keyword, "ig") } },
            { surname: { $regex: new RegExp(keyword, "ig") } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Therapist not found with keyword " + req.params.key
                });
            }
            // res.setHeader("Content-Type", "application/json;charset=utf-8");
            // res.send(data);
            res.render('therapist_view', {
                results: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Therapist not found with keyword " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Error retrieving Therapist with keyword " + req.params.id
            });
        });
});
//add a client
therapist.post('/', async (req, res) => {
    //const { title, first_name, last_name, mobile, email, home_address_id, shipping_address_id } = req.body;
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Therapist content cannot be empty!"
        });
    }
    // Create a new client (using schema)
    const newTherapist = new Therapist(
        req.body
    );
    // Save therapist in the database
    newTherapist.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the therapist."
            });
        });
});
//update therapist by id
therapist.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Therapist content cannot be empty"
        });
    }

    // Find the Therapist and update it with the request body
    Therapist.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating client with id " + req.params.id + err
            });
        });
});
//delete therapist by id
therapist.delete('/:id', (req, res) => {
    Therapist.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.id
                });
            }
            res.send({ message: "Therapist deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "therapist not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete therapist with id " + req.params.id + err
            });
        });
});

session.get('/', (req, res) => {
    Session.find().populate('clients').populate('therapist')
        .then(data => {
            res.render('session_view', {
                results: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all session."
            });
        });
});

session.get('/:key', (req, res) => {
    var keyword = req.params.key;
    Session.find.populate('clients').populate('therapist')({
        $or: [//match first name and last name
            { therapist: { $regex: new RegExp(keyword, "ig") } },
            { session_notes: { $regex: new RegExp(keyword, "ig") } }
        ]
    })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "session not found with keyword " + req.params.key
                });
            }
            // res.setHeader("Content-Type", "application/json;charset=utf-8");
            // res.send(data);
            res.render('Session_view', {
                results: data
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Session not found with keyword " + req.params.key
                });
            }
            return res.status(500).send({
                message: "Error retrieving session with keyword " + req.params.id
            });
        });
});
//add a session
session.post('/', async (req, res) => {
    //const { title, first_name, last_name, mobile, email, home_address_id, shipping_address_id } = req.body;
    // Validate the request
    if (!req.body) {
        return res.status(400).send({
            message: "Session content cannot be empty!"
        });
    }
    var duration = parseInt(req.body.session_duration);
    if (!(req.body.session_duration === "Cancelled") && !(req.body.session_duration === "No Show") && isNaN(duration)) {
        return res.status(400).send({
            message: "Invalid session duration!"
        });
    }

    if (req.body.clients.charAt(req.body.clients.length - 1) === "/")
        req.body.clients = req.body.clients.substr(0, req.body.clients.length - 1)
    req.body.clients = req.body.clients.split("/")

    if (!(req.body.session_type === "Intake") && !(req.body.session_type === "Psychotherapy") && !(req.body.session_type === "Assessment")) {
        req.body.session_type = "Other(" + req.body.session_type + ")";
    }
    console.log(req.body)
    // Create a new client (using schema)
    const newSession = new Session(
        req.body
    );
    // Save client in the database
    newSession.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the session."
            });
        });
});
//update session by id
session.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Session content cannot be empty"
        });
    }
    var duration = parseInt(req.body.session_duration);
    if (!(req.body.session_duration === "Cancelled") && !(req.body.session_duration === "No Show") && isNaN(duration)) {
        return res.status(400).send({
            message: "Invalid session duration!"
        });
    }
    if (req.body.clients.charAt(req.body.clients.length - 1) === "/")
        req.body.clients = req.body.clients.substr(0, req.body.clients.length - 1)
    req.body.clients = req.body.clients.split("/")

    if (!(req.body.session_type === "Intake") && !(req.body.session_type === "Psychotherapy") && !(req.body.session_type === "Assessment")) {
        req.body.session_type = "Other(" + req.body.session_type + ")";
    }


    // Find the session and update it with the request body
    Session.findByIdAndUpdate(req.params.id,
        { $set: req.body },   // $set - modify only the supplied fields
        { new: true })        // "new: true" return updated object
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Session not found with id " + req.params.id
                });
            }
            res.send(data);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Session not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating session with id " + req.params.id + err
            });
        });
});
//delete session by id
session.delete('/:id', (req, res) => {
    Session.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Session not found with id " + req.params.id
                });
            }
            res.send({ message: "session deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "session not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete session with id " + req.params.id + err
            });
        });
});

// session.get('/therapist/json', (req, res) => {
//     Therapist.find()
//         .then(data => {
//             res.header('Access-Control-Allow-Origin', '*')
//             res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
//             res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
//             res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "An error occurred while retrieving all therapist."
//             });
//         });
// });

// session.get('/client/json', (req, res) => {
//     Client.find()
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "An error occurred while retrieving all client."
//             });
//         });
// });


module.exports = { client, therapist, session }