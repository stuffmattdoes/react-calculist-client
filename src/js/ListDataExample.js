module.exports = {

    init: function() {
        // console.log("Lists Data Example Initialize");

        // localStorage.clear();
        localStorage.setItem('lists', JSON.stringify([
            {
                title: 'Groceries',
                ID: 'iv3v3mtv'
            },
            {
                title: 'Home Depot',
                ID: 'iv3v3mt2'
            }
        ]));
    }
}
