var resetAll = false;
var List = require('./models/Lists');
var Item = require('./models/Items');
var listSeed = [
    {
        title: 'Groceries',
        ID: 'iv3v3mtv'
    },
    {
        title: 'Home Depot',
        ID: 'iv3v3mt2'
    },
    {
        title: 'Empty list here!',
        ID: 'iv3v3mr2'
    }
];
var itemSeed = [
    {
        title: "Milk",
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
    },
    {
        title: "Eggs",
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
        ID: 'iv2rlmbl',
        listID: 'iv3v3mtv'
    },
    {
        title: "Cat food",
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
        ID: 'iv2rtpsl',
        listID: 'iv3v3mtv'
    },
    {
        title: "Vegetable oil",
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
        ID: 'iv2rkedc',
        listID: 'iv3v3mtv'
    },
    {
        title: "Butter",
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
        ID: 'iv2rxbgq',
        listID: 'iv3v3mtv'
    },
    {
        title: "More cat food",
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
        ID: 'iv2rsurb',
        listID: 'iv3v3mtv'
    },
    {
        title: "Just this one guy",
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
        ID: 'iv2rsu2b',
        listID: 'iv3v3mt2'
    }
];

listSeed.forEach(function(list, index) {
    // console.log(list);

    List.find({'ID': list.ID}, function(error, lists) {
        // console.log(lists);
        if (resetAll) {
            List.remove({}, function() {});
        }

        if (!error && !lists.length) {
            // console.log(listsSeed);
            List.create({
                title: list.title,
                ID: list.ID
            });
        }

    });
});

itemSeed.forEach(function(item, index) {

    Item.find({ID: item.ID}, function(error, items) {
        // console.log(items);
        if (resetAll) {
            Item.remove({}, function() {});
        }

        if (!error && !items.length) {
            // console.log("Go ahead");
            // console.log(item.listID);
            Item.create({
                title: item.title,
                checked: item.checked,
                amount: item.amount,
                tax: {
                    active: item.tax.actice,
                    singleTaxRate: item.tax.singleTaxRate
                },
                unitPricing: {
                    active: item.unitPricing.active,
                    price: item.unitPricing.price,
                    quantity: item.unitPricing.quantity
                },
                ID: item.ID,
                listID: item.listID
            });
        }

    });
});
