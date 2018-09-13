import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div style={{"backgroundColor": "white"}}>
                <SurveyMenu observationId={this.props.params.observationId} />
                {this.props.children}
            </div>
        )
    },
})             