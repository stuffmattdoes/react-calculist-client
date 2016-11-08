module.exports = {

    init: function() {
        console.log("Items Data Example Initialize");

        localStorage.clear();
        localStorage.setItem('items', JSON.stringify([
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
            }
        ]));
    }
}
