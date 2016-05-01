jest
    .unmock('../js/components/DisplaySelectedFieldDay')
    .unmock('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery'
import DisplaySelectedFieldDay from '../js/components/DisplaySelectedFieldDay';

describe('DisplaySelectedFieldDay', () => {
  var fieldDay = {"location": "Hallet Cove", "date": "2016-01-01"};
  var result = "Hallet Cove (2016-01-01)";

  it('subscribes to selectFieldDay', () => {
    // Render a checkbox with label in the document
    const displaySelectedFieldDay = TestUtils.renderIntoDocument(
      <DisplaySelectedFieldDay />
    );

    $.publish("selectFieldDay", fieldDay);

    const displaySelectedFieldDayContent = ReactDOM.findDOMNode(displaySelectedFieldDay);

    // Verify that it's Off by default
    expect(displaySelectedFieldDayContent.textContent).toEqual(result);
  });
  
  it('displays correctly when no data present', () => {
    // Render a checkbox with label in the document
    const displaySelectedFieldDay = TestUtils.renderIntoDocument(
      <DisplaySelectedFieldDay />
    );

    const displaySelectedFieldDayContent = ReactDOM.findDOMNode(displaySelectedFieldDay);

    // Verify that it's Off by default
    expect(displaySelectedFieldDayContent.textContent).toEqual('');
  });
  
  it('displays correctly when calling updateSelectedFieldDay', () => {
    // Render a checkbox with label in the document
    const displaySelectedFieldDay = TestUtils.renderIntoDocument(
      <DisplaySelectedFieldDay />
    );

    displaySelectedFieldDay.updateSelectedFieldDay(this, fieldDay);
    
    const displaySelectedFieldDayContent = ReactDOM.findDOMNode(displaySelectedFieldDay);

    // Verify that it's Off by default
    expect(displaySelectedFieldDayContent.textContent).toEqual(result);
  });

});

{/* Not sure why I needed to include this in here but if not present if can find jquery */}
(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}($));