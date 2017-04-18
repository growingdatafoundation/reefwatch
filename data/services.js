import config from '../config';
// import qs from 'qs';

const internals = {};

internals.baseUrl = config.api.hostname + ":" + config.api.port + "/" + config.api.prefix;


function failedRequest(jqXHR, textStatus, errorThrown) {
    console.error('Service request failed', jqXHR, textStatus, errorThrown);
}

// function getUrl(method, query) {

//     let url = config.api.hostname + ":" + config.api.port + "/" + config.api.prefix;

//     url += method + query
// }

export function getSurveyDaysWithLocations(callback) {

    $.get(config.api.hostname + ":" + config.api.port + "/" + config.api.prefix +
        "/SurveyDays?filter[include]=selectedSites&filter[include]=location", callback)
    .fail(failedRequest);
}

export function Locations(locationId, callback) {

    $.get(config.api.hostname + ":" + config.api.port + "/" + config.api.prefix + "/Locations/" + locationId,
        function (result) {

          callback(result.locationName);
        }
    )
    .fail(failedRequest);
}

export function GetSurveyDay(SurveyDayID, callback) {

    $.get(config.api.hostname + ":" + config.api.port + "/" + config.api.prefix +
        "surveyDays/" + SurveyDayID + "?filter[include]=location",
        callback
    )
    .fail(failedRequest);
}

// GET /SurveyDays/{id}/selectedSites
export function GetSurveyDaySelectedSites(SurveyDayID, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays/"+SurveyDayID+"/selectedSites", callback)
    .fail(failedRequest);
}

// GET /SurveyDays/{id}/observations
export function GetSurveyDayObservations(SurveyDayID, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays/"+SurveyDayID+"/observations", callback)
    .fail(failedRequest);
}

export function GetObservation(observationId, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Observations/"+observationId+"?filter[include]=volunteers", callback)
    .fail(failedRequest);
}

export function GetObservationBySiteId(SurveyDayID, SiteId, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"surveyDays/"+SurveyDayID+"?filter[where][SiteId]="+SiteId+"filter[include]=selectedSites&filter[include]=location&filter[include]=observations", callback)
    .fail(failedRequest);
}

export function AddSurveyDay(data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function AddObservation(data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Observations",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function AddSelectedSite(data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/SelectedSites/SaveSelectedSites",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetLocations(callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/locations?filter[include]=sites", callback)
    .fail(failedRequest)
}

export function GetSitesByLocation(locationId, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/locations/"+locationId+"/sites", callback)
    .fail(failedRequest)
}

export function GetVolunteers(observationId, callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/volunteers?filter[where][observationId]="+observationId, callback)
    .fail(failedRequest)
}

export function AddVolunteer(data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/volunteers",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetReefWatchVolunteers(callback) {

    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/reefWatchVolunteers", callback)
    .fail(failedRequest)
}

export function AddReefWatchVolunteer(data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/reefWatchVolunteers",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function SaveObservation(observationId, data, callback) {

    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Observations/"+observationId,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT'
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetSpecies(callback) {

    return $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/species", callback)
    .fail(failedRequest);
}

export function GetPointInterceptObservation(observationId, callback) {

    var rndNumber = Math.floor((Math.random() * 1000)).toString();
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Observations/"+observationId+"/PointIntercepts?forceRefresh="+rndNumber, callback)
    .fail(failedRequest)
}

export function GetPointIntercepts(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/PointIntercepts", callback)
    .fail(failedRequest)
}

export function AddPointIntercept(data, callback) {
    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/PointIntercepts",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    })
    .done(callback)
    .fail(failedRequest);
}

export function SavePointIntercept(data, callback) {
    $.ajax({
        url: config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/PointIntercepts",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT'
    })
    .done(callback)
    .fail(failedRequest);
}

export function getTimeSearchesForObservation(observationId, callback) {

    const url = `${internals.baseUrl}/Observations/${observationId}/timedSearches`
    $.get(url, callback)
        .fail(failedRequest)
}

export function upsertTimeSearch(data, callback) {

    $.ajax({
        url: `${internals.baseUrl}/TimedSearches/`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT'
    })
    .done(callback)
    .fail(failedRequest);
}

export function deleteTimeSearch(id, callback) {

    $.ajax({
        url: `${internals.baseUrl}/TimedSearches/${id}`,
        dataType: "json",
        contentType: "application/json",
        type: 'DELETE'
    })
    .done(callback)
    .fail(failedRequest);
}


//lookup data
export function GetBeaufortScale(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/BeaufortScales", callback)
    .fail(failedRequest)
}

export function GetCloudCover(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/CloudCovers", callback)
    .fail(failedRequest)
}

export function GetRainfall(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Rainfalls", callback)
    .fail(failedRequest)
}

export function GetQuadratRange(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/QuadratRanges", callback)
    .fail(failedRequest)
}

export function GetQuadratSpecies(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/QuadratSpecies", callback)
    .fail(failedRequest)
}