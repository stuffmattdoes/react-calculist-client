import React from 'react';

const ListFilter = React.createClass({

    render: function() {
        return (
            <div className="list-filter">
                <ul>
                    <li className="active">All</li>
                    <li>Checked</li>
                    <li>Unchecked</li>
                </ul>
            </div>
        );
    }
});

export default ListFilter;
