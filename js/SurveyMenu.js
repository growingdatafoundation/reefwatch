import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div style={{"backgroundColor": "white"}}>
                <SurveyMenu survey={this.props.params.surveyID} />
                {this.props.children}
            </div>
        )
    }
})             