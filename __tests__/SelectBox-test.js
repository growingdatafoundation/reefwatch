/* eslint-disable */
jest
    .unmock('../js/components/SelectBox')
    .unmock('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery'
import SelectBox from '../js/components/SelectBox';

describe('SelectBox', () => {
    var data = [ {key: "1", value:"Value1", display:"Display Value 1"},{key: "2", value:"Value2", display:"Display Value 2"},{key: "3", value:"Value3", display:"Display Value 3"}];
    var data_with_custom_fields = [ {fieldKey: "1", theValue:"Value1", show:"Display Value 1"},{fieldKey: "2", theValue:"Value2", show:"Display Value 2"},{fieldKey: "3", theValue:"Value3", show:"Display Value 3"}];

    it('Selectbox binds to options', () => {
        // Render a checkbox with label in the document
        const selectBox = TestUtils.renderIntoDocument(
            <SelectBox data={data} />
        );

        const selectBoxContent = ReactDOM.findDOMNode(selectBox);

        // Verify that it's Off by default
        expect(selectBoxContent.options.length).toEqual(3);
        expect(selectBoxContent.options[0].value).toEqual(data[0].value);
        expect(selectBoxContent.options[0].text).toEqual(data[0].display);
    });
  
    it('Selectbox binds to custom fields', () => {
        // Render a checkbox with label in the document
        const selectBox = TestUtils.renderIntoDocument(
            <SelectBox data={data_with_custom_fields} fields={["theValue", "show"]} />
        );

        const selectBoxContent = ReactDOM.findDOMNode(selectBox);

        // Verify that it's Off by default
        expect(selectBoxContent.options.length).toEqual(3);
        expect(selectBoxContent.options[0].value).toEqual(data_with_custom_fields[0].theValue);
        expect(selectBoxContent.options[0].text).toEqual(data_with_custom_fields[0].show);
    });
});