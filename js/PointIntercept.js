import React from 'react'
import Grid from './components/GridControl/Grid'

export default React.createClass({
    render() { 
        var data = { 
            columnData: [{ columnHeaderText: "", IsVertical: false, controlType: "display"}, 
                            { columnHeaderText: "Sediment depth (mm)", IsVertical: true, controlType: "text"}, 
                            { columnHeaderText: "Rock", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Turf", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Encrusting algae", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Foliaceous algae", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Neptunes necklace", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Sea Lettuce", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Seagrass", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Tube worms", IsVertical: true, controlType: "check"}, 
                            { columnHeaderText: "Mussels", IsVertical: true, controlType: "check"},
                            { columnHeaderText: "Other", IsVertical: true, controlType: "text"} 
                          ],
            rowData: [ 
                { 
                    row: [
                        { value: "10", IsRowHeader: true },   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
                    ]
                },
                { 
                    row: [
                        { value: "20", IsRowHeader: true},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
                    ] 
                },
                { 
                    row: [
                        { value: "30", IsRowHeader: true},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
                    ] 
                },
                { 
                    row: [
                        { value: "40", IsRowHeader: true},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"},   
                        { value: "1"}   
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