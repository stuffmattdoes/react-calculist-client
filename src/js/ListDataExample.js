module.exports = {

    init: function() {

        // localStorage.clear();
        localStorage.setItem('lists', JSON.stringify([
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
        ]));
    }
}
