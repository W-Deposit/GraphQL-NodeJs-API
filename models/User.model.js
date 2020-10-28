const mongoose = require('mongoose');
const Schemas = mongoose.Schema;

const AddressSchema = new Schemas({
    avenue_and_number: {type: String, trim: true},
    quarter: {type: String, trim: true},
    commune: {type: String, trim: true},
    town: {type: String, trim: true},
    country: {type: String, trim: true}
});

const NaissanceSchema = new Schemas({
    lieu_naissance: {type: String, trim: true},
    date_naissance: {type: Date, trim: true}
});

const WDepositAccountSchema = new Schemas({
    motif: {type: String, trim: true}, // intitule
    amount: {type: Number, trim: true},
    date_update: {type: Date, trim: true}
});

const WDepositToBankSchema = new Schemas({
    motif: {type: String, trim: true}, // intitule
    amount: {type: Number, trim: true},
    date_update: {type: Date, trim: true}
});

const UserSchema = new Schemas({
    name: {type: String, required: true, trim: true},
    firstname: {type: String, required: true, trim: true},
    lastname: {type: String, trim: true},
    username:{type: String, required:[true, 'the username cannot be empty']},
    password:{type: String, required:[true, 'the password cannot be empty']},
    gender: {type: String, required: true},
    phoneNumber: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now},
    naissance: NaissanceSchema,
    address: AddressSchema,
    wdepositAccount: WDepositAccountSchema,
    wdepositToBank: WDepositToBankSchema
    
});

module.exports = mongoose.model('User', UserSchema);