// Libraries
import React from 'react';

// Components
import ItemTax from './ItemTax';
import ItemUnitPrice from './ItemUnitPrice';

// Actions
import ItemActions from '../../actions/ItemActions';

const ENTER_KEY_CODE = 13;

const ItemSettings = React.createClass({

    propTypes: {
        itemProps: React.PropTypes.object.isRequired,
    },

    onListItemDelete: function() {
        let itemID = this.props.itemProps.itemID;
        ItemActions.itemDelete(itemID);
        this.setState(this.state);
    },

    render: function() {
        return (
            <div className="item-options">
                <form className="item-options__container">

                    <ItemUnitPrice itemProps={this.props.itemProps} />

                    <ItemTax itemProps={this.props.itemProps} />

                    <div className="align--right">
                        <div
                            className="button button--text button--text-warning"
                            onClick={this.onListItemDelete}
                        >
                            Delete
                        </div>
                    </div>
                </form>
            </div>
        );
    }

});

export default ItemSettings;
