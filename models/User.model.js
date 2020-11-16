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
    firstname: {
        type: String, 
        required: true
        },
    lastname: {
        type: String,
         required:true
        },
    gender: {
        type: String, 
        required: true
    },
    phonenumber: {
        type: String, 
        required: true
     },
    email: {type: String,
         required: true
        },
    password:{
        type:String,
        required:true
    },
    createdAt: {type: Date, default: Date.now},
    naissance: NaissanceSchema,
    address: AddressSchema,
    accounts_wdeposit: {
            balance: {type: Number, default: 0},
            createAt: {type: Date, default: Date.now()}
    },
    accounts_equity: {
        balance: {type: Number, default: 0},
        createAt: {type: Date, default: Date.now()}
},
});


module.exports = mongoose.model("users", UserSchema);