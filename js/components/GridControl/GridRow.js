
import React from 'react'
import $ from 'jquery'
import GridRowCell from './GridRowCell'

var gridRow = React.createClass({
    render() {
        return (
                <tbody>
                {
                    this.props.data.map(function(row, index) {
                        return ( 
                            <tr key={"RowID"+index}>
                                { Object.keys(row).map(function (key) {
                                    var field = row[key];
                                    row['index'] = index;
                                    return <GridRowCell key={key} fieldKey={key} columnData={this.props.columnData[key]} data={field} row={row} />;
                                }, this)}
                            </tr>
                        );
                    }, this)
                }
                </tbody>
            )
    }
});

module.exports = gridRow;