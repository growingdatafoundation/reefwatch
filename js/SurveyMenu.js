import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div style={{"backgroundColor": "white"}}>
                <SurveyMenu selectedFieldDayID={this.props.params.fieldDay} />
                {this.props.children}
            </div>
        )
    }
})             