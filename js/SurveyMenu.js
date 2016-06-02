import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div>
                <SurveyMenu selectedFieldDayID={this.props.params.fieldDay} />
                {this.props.children}
            </div>
        )
    }
})             