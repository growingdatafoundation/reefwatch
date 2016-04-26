var React = require('react');
var FormGenerator = require('./form-generator.js');

export default React.createClass({
  schema: {
    observatonDate: {
      type: Date,
      label: 'Date:',
      onChange: function() { alert("Hello"); }     
    },
    observation: {
      type: {
        observationTime: {
          type: String,
          label: 'Time',
          isRequired: true
        }
      }
    },
    tideLowHeight: {
      type: String,
      label: 'Height of low tide (m)',
      isRequired: true
    },
    tideLowTime: {
      type: String,
      label: 'Time of low tide (m)',
      isRequired: true
    },
    tideHighHeight: {
      type: String,
      label: 'Height of high tide (m)',
      isRequired: true
    },
    tideHighTime: {
      type: String,
      label: 'Time of high tide (m)',
      isRequired: true
    },
    location: {
      type: String,
      label: 'Location',
      enum: ['Aldinga North','Aldinga South','Lady Bay North','Lady Bay South','Hallet Cove', 'Victor Harbor', 'Beachport','Robe','Port Macdonnell'],
      isRequired: true
    },
    siteCode: {
      type: String,
      label: 'Site code',
      isRequired: true
    },
    volunteerNames: {
      type: String,
      label: 'Volunteer names',
      isRequired: true
    },
    weatherComment: {
      type: String,
      label: 'Weather Comment',
      isRequired: true
    },
    beaufortWindScale: {
      type: Number,
      label: 'Beaufort Wind Scale (1-5)',
      isRequired: true
    },
    windDirection: {
      type: String,
      enum: ['N','S','W','E','NW','NE','SW','SW'],
      label: 'Wind Direction',
      isRequired: true
    },
    seaState: {
      type: String,
      label: 'Sea State',
      enum: ['Calm','Smooth','Slight','Moderate','Rough'],
      isRequired: true
    },
    rainfall: {
      type: String,
      label: 'Rainfall',
      enum: ['Nil','Light','Moderate','Heavy'],
      isRequired: true
    },
    cloudCover: {
      type: Number,
      label: 'Cloud cover (eighths, 0-8)',
      isRequired: true
    },
    recentWeather: {
      type: String,
      label: 'Any recent tidal, weather, or other unusual events (e.g. heavy rain shortly before survey, storm, heatwave, wind held tide higher than expected):',
      isRequired: true
    }
  },
  onSubmit: function(data) {
    // Reset fields back to default values
    this.refs.myFormRef.reset();
  },

  render: function() {
    var schema = this.schema;
    var ref = 'myFormRef';
    var onSubmit = this.onSubmit;
    var formElement = FormGenerator.create(schema, ref, onSubmit);

    return <span>{formElement}</span>;
  }
})
