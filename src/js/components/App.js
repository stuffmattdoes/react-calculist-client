// Libraries
import React from 'react';

// Components
import Header from './Header';

// Application class
const App = React.createClass({

    render: function() {

        return (
            <div className="app">
                <Header title={"Calculist"} route={this.props.route} />
                { this.props.children }
            </div>
        );
    }
});

export default App;
