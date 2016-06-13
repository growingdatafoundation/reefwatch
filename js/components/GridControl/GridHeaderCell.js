import React from 'react'
import $ from 'jquery'

var GridHeaderCell = React.createClass({
    render() {
        var roateColumnText = (this.props.data.IsVertical) ? 'rotate': '';
            return (
            <th className={roateColumnText} key={this.props.key}>
                <div>
                    <span>{this.props.data.columnHeaderText}</span>
                </div>
            </th>
            )
    }
});
   
module.exports = GridHeaderCell;