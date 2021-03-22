const mongoose = require("mongoose");
const Schemas = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

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

const UserSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    gender: { type: String },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    password:{ type:String, required:true },
    compte: {type: String },
    wdeposit: {type: Number, default: 0 },
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model("users", UserSchema);