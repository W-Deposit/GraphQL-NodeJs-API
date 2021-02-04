const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    expediteur: { type: String, required: true},
    destinataire: { type: String, required: true},
    montant: { type: String, required: true},
    operation: { type: String, required: true},
    dateTransaction: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('transactions', TransactionSchema);