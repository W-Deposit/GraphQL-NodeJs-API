const mongoose = require("mongoose");
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
    amount: {type: Number, trim: true},
    date_update: {type: Date, trim: true}
});

const BankAccountSchema = new Schemas({
    amount: {type: Number,default:0,required:true},
    date_update: {type: Date},
   
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
    wdepositAccount: WDepositAccountSchema,
    bankAccount: BankAccountSchema
});


// export model user with UserSchema
module.exports = mongoose.model("users", UserSchema);