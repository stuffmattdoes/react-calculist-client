// Libraries
import React from 'react';

const ItemView = React.createClass({

    getInitialState: function() {
        return {
            itemsData: ItemStore.getAll(),
            filter: "all"
        };
    },

    componentWillMount: function() {
        ItemStore.on("change", this.getAllItems);
    },

    componentDidUnmonut: function() {
        ItemStore.removeListener("change", this.getAllItems);
    },

    getAllItems: function() {
        this.setState({
            itemsData: ItemStore.getAll()
        });
    },

    render: function() {

        return (
            <div className="item-view">
                <Header items={this.state.itemsData} />
                <div className="item-scroll">
                    <ItemFilter filter={this.state.filter} listData={this.state.itemsData} />
                    <div className="item-list">
                        {this.state.itemsData.map(function(listItem, index) {

                            return (
                                <Item
                                    itemProps={listItem}
                                    listData={this.state.itemsData}
                                    key={listItem.ID}
                                />
                            );
                        }.bind(this))}
                    </div>
                    <AddItem />
                </div>
                <Footer listData={this.state.itemsData} />
            </div>
        );
    }
});

export default ItemView;
