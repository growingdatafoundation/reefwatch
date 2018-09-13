import CONFIG from '../config/index';

// import qs from 'qs';

const BASE_URI = CONFIG.api.hostname + ":" + CONFIG.api.port + "/" + CONFIG.api.prefix;

function failedRequest(jqXHR, textStatus, errorThrown) {
    //eslint-disable-next-line no-console
    console.error('Service request failed', jqXHR, textStatus, errorThrown);
}

// function getUrl(method, query) {

//     let url = BASE_URI;

//     url += method + query
// }

export function getSurveyDaysWithLocations(callback) {

    $.get(BASE_URI +
        "/SurveyDays?filter[include]=selectedSites&filter[include]=location", callback)
    .fail(failedRequest);
}

export function Locations(locationId, callback) {

    $.get(BASE_URI + "/Locations/" + locationId,
        function (result) {

          callback(result.locationName);
        }
    )
    .fail(failedRequest);
}

export function GetSurveyDay(SurveyDayID, callback) {

    $.get(BASE_URI +
        "surveyDays/" + SurveyDayID + "?filter[include]=location",
        callback
    )
    .fail(failedRequest);
}

// GET /SurveyDays/{id}/selectedSites
export function GetSurveyDaySelectedSites(SurveyDayID, callback) {

    $.get(BASE_URI + "/surveyDays/" + SurveyDayID + "/selectedSites", callback)
    .fail(failedRequest);
}

// GET /SurveyDays/{id}/observations
export function GetSurveyDayObservations(SurveyDayID, callback) {

    $.get(BASE_URI + "/surveyDays/" + SurveyDayID + "/observations", callback)
    .fail(failedRequest);
}

export function GetObservationSurveyDay(observationId, callback) {
    $.get(BASE_URI + "/Observations/" + observationId + "/surveyDay", callback)
    .fail(failedRequest);
}

export function GetObservationWithVolunteers(observationId, callback) {

    $.get(BASE_URI + "/Observations/" + observationId + "?filter[include]=volunteers", callback)
    .fail(failedRequest);
}

export function GetObservation(observationId, callback) {

    $.get(BASE_URI + "/Observations/" + observationId, callback)
    .fail(failedRequest);
}

export function GetObservationBySiteId(SurveyDayID, SiteId, callback) {

    $.get(BASE_URI + "/surveyDays/" + SurveyDayID + "?filter[where][SiteId]=" + SiteId + "filter[include]=selectedSites&filter[include]=location&filter[include]=observations", callback)
    .fail(failedRequest);
}

export function AddSurveyDay(data, callback) {

    $.ajax({
        url: BASE_URI + "/surveyDays",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function AddObservation(data, callback) {

    $.ajax({
        url: BASE_URI + "/Observations",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function AddSelectedSite(data, callback) {

    $.ajax({
        url: BASE_URI + "/SelectedSites/SaveSelectedSites",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetLocations(callback) {

    $.get(BASE_URI + "/locations?filter[include]=sites", callback)
    .fail(failedRequest)
}

export function GetSitesByLocation(locationId, callback) {

    $.get(BASE_URI + "/locations/" + locationId + "/sites", callback)
    .fail(failedRequest)
}

export function GetVolunteers(observationId, callback) {

    $.get(BASE_URI + "/volunteers?filter[where][observationId]=" + observationId, callback)
    .fail(failedRequest)
}

export function AddVolunteer(data, callback) {

    $.ajax({
        url: BASE_URI + "/volunteers",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

// deletes all volunteers for boservation
export function deleteObservationVolunteers(id, callback) {
    $.ajax({
        url: `${BASE_URI}/Observations/${id}/volunteers`,
        dataType: "json",
        contentType: "application/json",
        type: 'DELETE',
    })
    .done(callback)
    .fail(failedRequest);
}

export function addObservationVolunteers(id, data, callback) {
    $.ajax({
        url: `${BASE_URI}/Observations/${id}/volunteers`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetReefWatchVolunteers(callback) {

    $.get(BASE_URI + "/reefWatchVolunteers", callback)
    .fail(failedRequest)
}

export function AddReefWatchVolunteer(data, callback) {

    $.ajax({
        url: BASE_URI + "/reefWatchVolunteers",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function SaveObservation(observationId, data, callback) {

    $.ajax({
        url: BASE_URI + "/Observations/" + observationId,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT',
    })
    .done(callback)
    .fail(failedRequest);
}

export function GetSpecies(callback) {

    return $.get(BASE_URI + "/species", callback)
    .fail(failedRequest);
}

export function GetPointInterceptObservation(observationId, callback) {

    var rndNumber = Math.floor((Math.random() * 1000)).toString();
    $.get(BASE_URI + "/Observations/" + observationId + "/PointIntercepts?forceRefresh=" + rndNumber, callback)
    .fail(failedRequest)
}

export function GetPointIntercepts(callback) {
    $.get(BASE_URI + "/PointIntercepts", callback)
    .fail(failedRequest)
}

export function AddPointIntercept(data, callback) {
    $.ajax({
        url: BASE_URI + "/PointIntercepts",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST',
    })
    .done(callback)
    .fail(failedRequest);
}

export function SavePointIntercept(data, callback) {
    $.ajax({
        url: BASE_URI + "/PointIntercepts",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT',
    })
    .done(callback)
    .fail(failedRequest);
}

export function getTimeSearchesForObservation(observationId, callback) {

    const url = `${BASE_URI}/Observations/${observationId}/timedSearches`
    $.get(url, callback)
        .fail(failedRequest)
}

export function upsertTimeSearch(data, callback) {

    $.ajax({
        url: `${BASE_URI}/TimedSearches/`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT',
    })
    .done(callback)
    .fail(failedRequest);
}

export function deleteTimeSearch(id, callback) {

    $.ajax({
        url: `${BASE_URI}/TimedSearches/${id}`,
        dataType: "json",
        contentType: "application/json",
        type: 'DELETE',
    })
    .done(callback)
    .fail(failedRequest);
}


export function upsertQuadrat(data, callback) {
    $.ajax({
        url: `${BASE_URI}/Quadrats`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'PUT',
    })
    .done(callback)
    .fail(failedRequest);
}


export function GetQuadrats(observationId, callback) {
    $.get(BASE_URI + "/Quadrats?filter[where][observationId]=" + observationId, callback)
    .fail(failedRequest)
}

//lookup data
export function GetBeaufortScale(callback) {
    $.get(BASE_URI + "/BeaufortScales", callback)
    .fail(failedRequest)
}

export function GetCloudCover(callback) {
    $.get(BASE_URI + "/CloudCovers", callback)
    .fail(failedRequest)
}

export function GetRainfall(callback) {
    $.get(BASE_URI + "/Rainfalls", callback)
    .fail(failedRequest)
}

export function GetQuadratRange(callback) {
    $.get(BASE_URI + "/QuadratRanges", callback)
    .fail(failedRequest)
}

export function GetQuadratSpecies(callback) {
    $.get(BASE_URI + "/QuadratSpecies", callback)
    .fail(failedRequest)
}


/*S# attachments */
export function GetAttachments(callback) {
    $.get(BASE_URI + "/Attachments/gdf-reefwatch-images/files", callback)
    .fail(failedRequest)
}

export function AddAttachment(data, callback) {
    $.ajax({
        url: BASE_URI + "/Attachments/gdf-reefwatch-images/upload",
        data: data,
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
     })
    .done(callback)
    .fail(failedRequest);
}
