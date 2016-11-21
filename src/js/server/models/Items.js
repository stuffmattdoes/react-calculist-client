'use strict';

var mongoose = require('mongoose');

/*
    title: "Item Title",
    checked: false,
    amount: 0.00,
    tax: {
        active: false,
        singleTaxRate: 0.0
    },
    unitPricing: {
        active: false,
        price: 0.00,
        quantity: 0
    },
    ID: 'iv2r6zml',
    listID: 'iv3v3mtv'
*/

var itemSchema = new mongoose.Schema({
    title: String,
    checked: Boolean,
    amount: Number,
    tax: {
        active: Boolean,
        singleTaxRate: Number
    },
    unitPricing: {
        active: Boolean,
        price: Number,
        quantity: Number
    },
    ID: String,
    listID: String
});

var itemModel = mongoose.model('Item', itemSchema);

module.exports = itemModel;
