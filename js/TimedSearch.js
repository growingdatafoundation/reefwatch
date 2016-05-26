import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

export default React.createClass({
    cellEditProp: function () {
      
    },
    render() {                
        var species = [
          {id: 1, atlas: "[11cabb79-55f7-4bb0-900f-199d48d3e9ac]", species: "Rock Crab / Reef Crab"},
          {id: 2, atlas: "[2fa1a3ed-e1ce-421f-8075-12246d90b03e,a208f58d-e5b0-44df-86bd-3300369ab8b4]", species: "Pebble Crab"},
          {id: 3, atlas: "", species: "Crab Other"},
          {id: 4, atlas: "", species: "Anemones"},
          {id: 5, atlas: "", species: "Nerita atramentosa"},
          {id: 6, atlas: "", species: "Austrocochlea spp."},
          {id: 7, atlas: "", species: "Bembicium spp."},
          {id: 8, atlas: "", species: "Lepsiella spp."},
          {id: 9, atlas: "", species: "Checkerboard snail"},
          {id: 10, atlas: "", species: "True limpet >5 mm"},
          {id: 11, atlas: "", species: "Siphon limpets"},
          {id: 12, atlas: "", species: "Rock whelk"},
          {id: 13, atlas: "", species: "Barnacles"},
          {id: 14, atlas: "", species: "Mussels"},
          {id: 15, atlas: "", species: "Tube worms"},
          {id: 16, atlas: "", species: "Nudibranchs"},
          {id: 17, atlas: "", species: "Sea stars"},
          {id: 18, atlas: "", species: "Chitons"},
          {id: 19, atlas: "", species: "Elephant snail"},
          {id: 20, atlas: "", species: "Sea centipede"},
          {id: 21, atlas: "", species: "Sea hare"},
          {id: 22, atlas: "", species: "Feral marine species"},
          {id: 23, atlas: "", species: "Marine debris - plastic"},
          {id: 24, atlas: "", species: "Marine debris - non-plastic"},
          {id: 25, atlas: "", species: "Other"}
        ];
        var data = [
          {id: 1, atlas: "[11cabb79-55f7-4bb0-900f-199d48d3e9ac]", species: "Rock Crab / Reef Crab" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 2, atlas: "[2fa1a3ed-e1ce-421f-8075-12246d90b03e,a208f58d-e5b0-44df-86bd-3300369ab8b4]", species: "Pebble Crab" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 3, atlas: "", species: "Crab Other" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 4, atlas: "", species: "Anemones" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 5, atlas: "", species: "Nerita atramentosa" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 6, atlas: "", species: "Austrocochlea spp." , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 7, atlas: "", species: "Bembicium spp." , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 8, atlas: "", species: "Lepsiella spp." , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 9, atlas: "", species: "Checkerboard snail" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 10, atlas: "", species: "True limpet >5 mm" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 11, atlas: "", species: "Siphon limpets" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 12, atlas: "", species: "Rock whelk" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 13, atlas: "", species: "Barnacles" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 14, atlas: "", species: "Mussels" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 15, atlas: "", species: "Tube worms" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 16, atlas: "", species: "Nudibranchs" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 17, atlas: "", species: "Sea stars" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 18, atlas: "", species: "Chitons" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 19, atlas: "", species: "Elephant snail" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 20, atlas: "", species: "Sea centipede" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 21, atlas: "", species: "Sea hare" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 22, atlas: "", species: "Feral marine species" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 23, atlas: "", species: "Marine debris - plastic" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 24, atlas: "", species: "Marine debris - non-plastic" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" },
          {id: 25, atlas: "", species: "Other" , submerged: 0, exposed: 0, crevice: 0,  sandy: 0,  other: "" }
        ];


        return (  
            <div>
                <h2>Timed Search</h2>
                <BootstrapTable data={data} cellEdit={{mode: "click"}}>
                  <TableHeaderColumn dataField="species" isKey={true}>Species</TableHeaderColumn>
                  <TableHeaderColumn dataField="submerged">Submerged</TableHeaderColumn>
                  <TableHeaderColumn dataField="exposed">Exposed</TableHeaderColumn>
                  <TableHeaderColumn dataField="crevice">In a Crevice</TableHeaderColumn>
                  <TableHeaderColumn dataField="sandy">On a Sandy Patch</TableHeaderColumn>
                  <TableHeaderColumn dataField="other">Other?</TableHeaderColumn>
                </BootstrapTable>
                
            </div>
        )
    }
}) 
