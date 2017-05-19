/**
 * Created by ckyoung on 18-May-17.
 */
var map;
var locations = [];
var Boef = require('./Boef.js');

function initMap() {
    var myLatLng = {lat: 52.102346, lng: 5.175269};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {lat: 52.102346, lng: 5.175269}
    });

    getLocationOfSensorRow();

    var marker = new google.maps.Marker({
        position: locations[0],
        map: map,
        label: "E"
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 1; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: locations[i],
            map: map,
            label: "S"+i
        });

    }
}

function getLocationOfSensorRow() {
    Boef.placeEmitter(52.102346, 5.175269);
    locations.push({lat: Boef.emitters()[0].latitude, lng: Boef.emitters()[0].longitude});
    Boef.placeSensors(52.101448, 5.175354, 10);

    var rows = Boef.rows();

    for (var entry in rows[0]) {
        locations.push(new google.maps.LatLng(rows[0][entry].latitude, rows[0][entry].longitude));
    }
    console.log(locations);
}
