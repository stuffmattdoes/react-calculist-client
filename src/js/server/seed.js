'use strict';

var List = require('./models/Lists');
var lists = [
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

lists.forEach(function(list, index) {

    List.find({'ID': list.ID}, function(error, lists) {

        if (lists.length) {
            // console.log(lists.length);
            List.remove({}, function() {});
        }

        if (!error && !lists.length) {
            // console.log(lists);
            List.create({
                title: list.title,
                ID: list.ID
            });
        }

    });
});
