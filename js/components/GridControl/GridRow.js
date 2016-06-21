
import React from 'react'
import $ from 'jquery'
import GridRowCell from './GridRowCell'

var gridRow = React.createClass({
    render() {
        return (
                <tbody>
                {
                    this.props.data.rowData.map(function(item, index) {
                        return ( 
                            <tr key={index}> 
                                {
                                    item.row.map(function(row, rowIndex) {
                                        return <GridRowCell data={row} controlData={this.props.data.columnData[rowIndex].data} controlType={this.props.data.columnData[rowIndex].controlType} />;
                                    }, this)
                                }
                            </tr>
                        );
                    }, this)
                }
                </tbody>
            )
    }
});

module.exports = gridRow;