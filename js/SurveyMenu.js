import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div style={{"backgroundColor": "white"}}>
                <SurveyMenu survey={this.props.params.survey} />
                {this.props.children}
            </div>
        )
    }
})             