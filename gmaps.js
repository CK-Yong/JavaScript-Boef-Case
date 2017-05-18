/**
 * Created by ckyoung on 18-May-17.
 */
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.102346, lng: 5.175269},
        zoom: 18
    });

    getLocationOfSensorRow();

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
}


function getLocationOfSensorRow() {
    Boef.placeSensors(52.102346, 5.175269, 10);
    for (var sensor in Boef.rows()[0]) {
        if (sensor.hasOwnProperty('latitude') && sensor.hasOwnProperty('longitude')) {
            locations.push({lat: sensor.latitude, lng: sensor.longitude});
        }
    }
}

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var locations = [];




