import React from 'react';
import Dropzone from 'react-dropzone';

export default React.createClass({
    submit: function(data) {
    },
    onDrop: function (files) {
        this.fileUpload(files);
    },
    fileUpload: function (files) {
        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        // START A LOADING SPINNER HERE
        // Create a formdata object and add the files
        var data = new FormData();
        $.each(files, function(key, value)
        {
            data.append(key, value);
        });

        $.ajax({
            url: '',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(result, textStatus, jqXHR)
            {
                if (typeof result.error === 'undefined')
                {
                    // Success so call function to process the form
                }
                else
                {
                    // Handle errors here
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                // STOP LOADING SPINNER
            }
        });        
    },
    render () {
        return (
            <span>
                <Dropzone onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </span>
        )
    }
});