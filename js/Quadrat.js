import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default React.createClass({
    beforeSave: function () {
        
    },
    render() {                
        var data = [
            { species: "Number of individuals between 0-2 m", nerita: "" }
        ];
        return (  
            <div>
                <h2>Quadrat</h2>
                <BootstrapTable condensed={true} ref="testing" data={data} cellEdit={{mode: "click", blurToSave: true, beforeSaveCell: this.beforeSave}}>
                  <TableHeaderColumn className="verticalText" dataField="species" isKey={true}>verticalText</TableHeaderColumn>
                  <TableHeaderColumn className="verticalText" dataField="nerita">Nerita atramentosa</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}) 
