import React from 'react';
import Dropzone from 'react-dropzone';
import * as Services from "../data/services";
import ImageGallery from 'react-image-gallery';

/* eslint-disable new-cap */

export default React.createClass({
    getInitialState: function() {
        var state = {};

        state.images = [];
        this.loadAttachments();
        return state;
    },
    loadAttachments: function() {
        Services.GetAttachments(function (result) {
            var images = [];
            $.each(result, function(key, value)
            {
                images.push({
                    "original": "http://gdf-reefwatch-images.s3.amazonaws.com/" + value.name,
                    "thumbnail": "http://gdf-reefwatch-images.s3.amazonaws.com/" + value.name,
                })
            });
            this.setState({"images": images});
        }.bind(this));
    },
    submit: function(data) {
    },
    onDrop: function (files) {
        this.fileUpload(files);
    },
    handleImageLoad: function() {

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

        Services.AddAttachment(data, function (result) {
            // TODO
        });// bind here?

    },
    render () {
        return (
            <span>
                <Dropzone onDrop={this.onDrop} className="dropzone">
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <ImageGallery
                    items={this.state.images}
                    slideInterval={2000}
                    onImageLoad={this.handleImageLoad}/>
            </span>
        )
    },
});
