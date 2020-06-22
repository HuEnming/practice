const mongoose = require('mongoose');
//commect to the remote database
mongoose.connect('connection information', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected successfully'))
    .catch(err => console.log(err, 'connection failed'));

//customer schema
const customerSchema = new mongoose.Schema({
    title: String,
    first_name: { type: String, required: [true, 'first name is needed'] },
    last_name: { type: String, required: [true, 'last name is needed'] },
    mobile: { type: String, required: [true, 'mobile is needed'] },
    email: { type: String, required: [true, 'email is needed'] },
    home_line1: { type: String, required: [true, 'home_line1 is needed'] },
    home_line2: String,
    home_town: { type: String, required: [true, 'home_town is needed'] },
    home_city: { type: String, required: [true, 'home_city is needed'] },
    home_eircode: String,
    shipping_line1: { type: String, required: [true, 'shipping_line1 is needed'] },
    shipping_line2: String,
    shipping_town: { type: String, required: [true, 'shipping_town is needed'] },
    shipping_city: { type: String, required: [true, 'shipping_city is needed'] },
    shipping_eircode: String,
}, { timestamps: true })
//item schema
const itemSchema = new mongoose.Schema({
    manufacturer: { type: String, required: [true, 'manufacturer is needed'] },
    model: { type: String, required: [true, 'model is needed'] },
    price: { type: String, required: [true, 'price is needed'] }
})
//order schema
const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true })

//create customer model
const Customer = mongoose.model('Customer', customerSchema);
//create item model
const Item = mongoose.model('Item', itemSchema);
//create order model
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Customer,
    Item,
    Order
}