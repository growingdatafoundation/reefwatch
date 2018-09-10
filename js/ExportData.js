import React from 'react'

export default React.createClass({

    render() {
    if (localStorage.getItem('id_token')===null) {
        return (
            <div>
            <h2>You must log in to view the page!!</h2>
            </div>
        )
    }
    else {

        return (
            <div>
                <h2>Export Data</h2>
            </div>
        )
    }},
})
