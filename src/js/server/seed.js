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
        console.log(error, lists);

        if (!error && !lists.length) {
            lists.create({
                title: lists.title,
                ID: lists.ID
            });
        }
    });
});
