import React from 'react'
import SurveyMenu from './components/SurveyMenu'

export default React.createClass({
    render() {                
        return (  
            <div className="contentPage">
                <SurveyMenu />
                {this.props.children}
            </div>
        )
    }
})                    