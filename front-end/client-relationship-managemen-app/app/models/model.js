const mongoose = require('mongoose');
//commect to the remote database
mongoose.connect('connection information', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected successfully'))
    .catch(err => console.log(err, 'connection failed'));

//therapist schema
const therapistSchema = new mongoose.Schema({
    title: String,
    first_name: { type: String, required: [true, 'first name is required'] },
    surname: { type: String, required: [true, 'last name is required'] },
    mobile_phone: { type: String, required: [true, 'mobile number is required'] },
    home_phone: { type: String, required: [true, 'home phone mumber is required'] },
    email_address: { type: String, required: [true, 'email address is required'] },
    address_line1: { type: String, required: [true, 'line1 is required'] },
    address_line2: String,
    town: { type: String, required: [true, 'town is required'] },
    city: { type: String, required: [true, 'city is required'] },
    eircode: String,
}, { timestamps: true })

//client schema
const clientSchema = new mongoose.Schema({
    title: String,
    first_name: { type: String, required: [true, 'first name is required'] },
    surname: { type: String, required: [true, 'last name is required'] },
    mobile_phone: { type: String, required: [true, 'mobile number is required'] },
    home_phone: { type: String, required: [true, 'home phone mumber is required'] },
    email_address: { type: String, required: [true, 'email address is required'] },
    address_line1: { type: String, required: [true, 'line1 is required'] },
    address_line2: String,
    town: { type: String, required: [true, 'town is required'] },
    city: { type: String, required: [true, 'city is required'] },
    eircode: String,
    date_of_birth: { type: Date, required: [true, 'birthday is required'] },
    guardian_name: { type: String },
    permission: { type: Boolean, required: [true, 'permission is required'] },
    registered_date: { type: Date, default: Date.now(), required: [true, 'registered date is required'] },
    marital_status: {
        type: String,
        enum: ['Never Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed'], default: 'Never Married', required: [true, 'marital status is required']
    },
    referred_by: { type: String }
}, { timestamps: true })

//session schema
const sessionSchema = new mongoose.Schema({
    // Fee (€)*, Session Number*, Session Dura,on/Cancelled/No Show*,  Session  Type*  [Intake,  Psychotherapy,  Assessment,  Other  (Specify)],  Issue  Flag*  [Yes/No],  Session Notes*. The fields marked * are required fields, i.e. they must contain values. 
    session_date: { type: Date, required: [true, 'session date is required'] },
    session_time: { type: String, required: [true, 'session time is required'] },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
    fee: { type: Number, required: [true, 'fee is required'] },
    session_number: { type: String, required: [true, 'session number is required'] },
    session_duration: { type: String, required: [true, 'session duration is required'] },
    session_type: {
        type: String, required: [true, 'session type is required']
    },
    issue_flag:  { type: Boolean, required: [true, 'issue flag is required'] },
    session_notes: { type: String, required: [true, 'session notes is required'] },
}, { timestamps: true })

//create client model
const Client = mongoose.model('Client', clientSchema);
//create therapist model
const Therapist = mongoose.model('Therapist', therapistSchema);
//create session model
const Session = mongoose.model('Session', sessionSchema);

module.exports = {
    Client,
    Therapist,
    Session
}