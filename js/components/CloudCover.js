import React from 'react'
import SelectBox from './SelectBox';

var CloudCover = React.createClass({
  getInitialState: function () {
    var initialState = {};
    initialState.cloudCover = [];
    initialState.cloudCover.push({value: 0, display: "Cloudless"});
    initialState.cloudCover.push({value: 1, display: "One eigth or less but a little"});
    initialState.cloudCover.push({value: 2, display: "Two eights"});
    initialState.cloudCover.push({value: 3, display: "Three eights"});
    initialState.cloudCover.push({value: 4, display: "Four eights"});
    initialState.cloudCover.push({value: 5, display: "Five eights"});
    initialState.cloudCover.push({value: 6, display: "Six eights"});
    initialState.cloudCover.push({value: 7, display: "Seven eights"});
    initialState.cloudCover.push({value: 8, display: "Full cover"});
    initialState.imageSource = require("./images/Clear_1.png");
    
    return initialState;      
  },
  handleCloudCoverChange: function (e) {
    var imageSource = require("./images/Clear_1.png");
    switch(parseInt(e.target.value)) {
        case 0:
            imageSource = require("./images/Clear_1.png");
            break;
        case 1:
            imageSource  = require("./images/eigths_1.png");
            break;
        case 2:
            imageSource = require("./images/eigths_2.png");
            break;
        case 3:
            imageSource = require("./images/eigths_3.png");
            break;
        case 4:
            imageSource = require("./images/eigths_4.png");
            break;
        case 5:
            imageSource = require("./images/eigths_5.png");
            break;
        case 6:
            imageSource = require("./images/eigths_6.png");
            break;
        case 7:
            imageSource = require("./images/eigths_7.png");
            break;
        case 8:
            imageSource = require("./images/eigths_8.png");
            break;
    }
    this.setState({ imageSource: imageSource });
  },
  render() {
    return (
            <div>
                <div className="col-xs-4">
                    <SelectBox  onChange={this.handleCloudCoverChange} data={this.state.cloudCover} />
                </div>
                <div><img className="img-thumbnail" src={this.state.imageSource} /></div>
            </div>
        )
  }
});

module.exports = CloudCover;