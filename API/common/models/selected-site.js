'use strict';
var app = require('../../server/server');
module.exports = function(SelectedSite) {
    // Selectedsite.createObservation = function(SelectedSite, cb) {
    //     loopback.Model.Observation
    // };

    // SelectedSite.remoteMethod(
    //     'createObservation',
    //     {
    //         accpets: {arg: 'SelectedSite', type: 'Object', required: true},
    //         http: { path: '/createObservation', verb: 'post' },
    //         returns: { arg: 'SelectedSite', type: 'Object'}
    //     }
    // );

  SelectedSite.SaveSelectedSites = function(SelectedSite, cb) {
    console.log('SelectedSite: ', SelectedSite.toObject());
    console.log('App', app);
    var observationP = app.models.Observation;
    var selectedSiteP = app.models.SelectedSite;

    var observationData = {
      'observationTime': new Date().toLocaleString(),
      'surveyDayId': SelectedSite.surveyDayId,
    };

    observationP.observationTime = new Date().toLocaleString();
    console.log('Observation', observationP);
    console.log('Create Observation');
    observationP.create(observationData, function(err, observation) {
      console.log('ObservationID', observation.id);
      SelectedSite.observationId = observation.id;
      selectedSiteP.create(SelectedSite, function(err, selectedSite) {
        console.log('SelectedSiteID', selectedSite.id);
        cb(null, selectedSite);
      });
    });
  };

  SelectedSite.remoteMethod('SaveSelectedSites', {
    accepts: {arg: 'data', type: 'SelectedSite', http: {source: 'body'}},
    returns: {arg: 'data', type: 'SelectedSite', root: true},
  });
};

/**
 *
 * @param {Function(Error)} callback
 */
