import config from "../config"

export function GetSurveyDaysWithLocations(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/SurveyDays?filter[include]=selectedSites&filter[include]=location", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};


export function Locations(locationId, callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Locations/"+locationId, function (result) {
        var data = result.locationName;
        callback(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};

export function GetSurveyDay(SurveyDayID, callback) { 
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"surveyDays/"+SurveyDayID+"?filter[include]=location", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};

//GET /SurveyDays/{id}/selectedSites
export function GetSurveyDaySelectedSites(SurveyDayID, callback) { 
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays/"+SurveyDayID+"/selectedSites", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};


///SurveyDays/{id}/observations
export function GetSurveyDayObservations(SurveyDayID, callback) { 
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays/"+SurveyDayID+"/observations", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};


export function GetObservation(SurveyDayID, callback) { 
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"surveyDays/"+SurveyDayID+"?filter[include]=selectedSites&filter[include]=location&filter[include]=observations", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    });
};

export function AddSurveyDay(data, callback) {
    $.ajax({
        url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays",
        data        : JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    }).done(function(data){
        callback(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        alert("Failed");
    });
};

export function AddObservation(data, callback) {
    $.ajax({
        url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/Observations",
        data        : JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    }).done(function(data){
        callback(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        alert("Failed");
    });
};

export function AddSelectedSite(data, callback) {
    $.ajax({
        url         : config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/surveyDays/"+data.surveyDayId+"/selectedSites",
        data        : JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        type: 'POST'
    }).done(function(data){
        callback(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
        alert("Failed");
    });
};

export function GetLocations(callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/locations?filter[include]=sites", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    })
}

export function GetSitesByLocation(locationId, callback) {
    $.get(config.api.hostname + ":"+config.api.port+"/"+config.api.prefix+"/locations/"+locationId+"/sites", function (result) {
        callback(result);
    })
    .fail(function(jqXHR, textStatus, errorThrown) { 
    })
}




