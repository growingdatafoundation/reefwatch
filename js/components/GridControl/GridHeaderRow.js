import React from 'react'
import $ from 'jquery'
import GridHeaderCell from './GridHeaderCell'

var gridHeaderRow = React.createClass({
    render() {
        return (
                <thead>
                    <tr>
                        {
                            this.props.data.map(function(item, index) {
                                return <GridHeaderCell key={index} data={item} />;
                            })
                        }
                    </tr>
                </thead>
            )
    },
});

module.exports = gridHeaderRow;