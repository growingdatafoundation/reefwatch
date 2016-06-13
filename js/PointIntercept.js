import React from 'react'
import Grid from './components/GridControl/Grid'

export default React.createClass({
    render() { 
        var data = { 
            columnData: [ { columnHeaderText: "", IsVertical: false, controlType: "display"}, { columnHeaderText: "Column2", IsVertical: true, controlType: "text"}, { columnHeaderText: "Column3", IsVertical: true, controlType: "radio"} ], 
            rowData: [ 
                { 
                    row: [
                        { value: "10", IsRowHeader: true },   
                        { value: "1"},   
                        { value: "1"}   
                    ] 
                },
                { 
                    row: [
                        { value: "20", IsRowHeader: true},   
                        { value: "2"},   
                        { value: "2"}   
                    ] 
                },
                { 
                    row: [
                        { value: "30", IsRowHeader: true},   
                        { value: "3"},   
                        { value: "3"}   
                    ] 
                },
                { 
                    row: [
                        { value: "40", IsRowHeader: true},   
                        { value: "4"},   
                        { value: "4"}   
                    ] 
                }
            ]
        };
                       
        return (  
            <div>
                <h2>Point Intercept</h2>
                <Grid data={data} />
            </div>
        )
    }
}) 