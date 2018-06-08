import React from 'react'

export default React.createClass({
    render() { 
        if(localStorage.getItem('id_token')===null){
            return(
                <div>
                <h2>You must log in to view the page!!</h2>
                </div>
            )
        }
        else{               
        return (  
            <div className="contentPage">
                <h2>Admin</h2>
            </div>
        )
    }}
})      
