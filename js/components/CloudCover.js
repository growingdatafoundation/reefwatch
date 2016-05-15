import React from 'react'
import Typeahead from 'react-bootstrap-typeahead';

var CloudCover = React.createClass({
  getInitialState: function () {
    var initialState = {};
    initialState.cloudCover = [];
    initialState.cloudCover.push({id: 0, cloudCover: "Cloudless"});
    initialState.cloudCover.push({id: 1, cloudCover: "One eigth or less but a little"});
    initialState.cloudCover.push({id: 2, cloudCover: "Two eights"});
    initialState.cloudCover.push({id: 3, cloudCover: "Three eights"});
    initialState.cloudCover.push({id: 4, cloudCover: "Four eights"});
    initialState.cloudCover.push({id: 5, cloudCover: "Five eights"});
    initialState.cloudCover.push({id: 6, cloudCover: "Six eights"});
    initialState.cloudCover.push({id: 7, cloudCover: "Seven eights"});
    initialState.cloudCover.push({id: 8, cloudCover: "Full cover"});
    initialState.imageSource = require("./images/Clear_1.png");
    
    return initialState;      
  },
  handleCloudCoverChange: function (value) {
      var imageSource = require("./images/Clear_1.png");
      if(value.length >0) {
        switch(value[0].id) {
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
      }
      this.setState({ imageSource: imageSource });
  },
  render() {
    return (
            <div>
                <div>
                    <Typeahead               
                        labelKey="cloudCover"
                        onChange={this.handleCloudCoverChange}
                        options={this.state.cloudCover}
                        allowNew={false}
                        multiple={true}
                        id="cloudCover"/>
                </div>
                <div><img src={this.state.imageSource} /></div>
            </div>
        )
  }
});

module.exports = CloudCover;