// Module Boef
Boef = (function () {
    var emitters = [];
    var sensors = [];
    var rows = [];
    var radius = 6371000; //radius of Earth in meters
    var resourceTravelSpeed = 1493;
    var soilTravelSpeed = 4176;
    var resourceTravelTime;

    //Applies the haversine function
    function hav(delta) {
        return (Math.sin(delta / 2)) * (Math.sin(delta / 2));
    }

    function toRadians(value) {
        return value * Math.PI / 180;
    }

    return {
        placeEmitter: function (latitude, longitude) {
            emitters.push({latitude: latitude, longitude: longitude});
        },
        emitters: function () {
            return emitters;
        },
        placeSensor: function (latitude, longitude) {
            sensors.push({
                latitude: latitude,
                longitude: longitude,
                distance: function () {
                    var subFormulaA = hav(toRadians(this.latitude) - toRadians(emitters[0].latitude));
                    var subFormulaB = Math.cos(toRadians(this.latitude)) * Math.cos(toRadians(emitters[0].latitude));
                    var subFormulaC = hav(toRadians(this.longitude) - toRadians(emitters[0].longitude));

                    return 2 * radius * Math.asin(Math.sqrt(subFormulaA + (subFormulaB * subFormulaC)));
                },
                pulse: function (pulseTravelTime) {
                    var dist = this.distance();
                    resourceTravelTime = (soilTravelSpeed * pulseTravelTime - dist) / (soilTravelSpeed - resourceTravelSpeed);
                },
                amountOfResourcesInMeters: function () {
                    return resourceTravelTime * resourceTravelSpeed;
                }
            });
        },
        placeSensors: function (latitude, longitude, number) {
            var latitudeDelta = latitude - emitters[0].latitude;
            var longitudeDelta = longitude - emitters[0].longitude;

            if (sensors.length !== 0) {
                latitudeDelta = latitude - sensors[sensors.length-1].latitude;
                longitudeDelta = longitude - sensors[sensors.length-1].longitude;
            }

            this.placeSensor(latitude, longitude);

            if (number === 1) {
                rows.push(sensors);
                return;
            }

            return this.placeSensors(latitude + latitudeDelta, longitude + longitudeDelta, number - 1);
        },
        sensors: function () {
            return sensors;
        },
        reset: function () {
            rows = [];
            emitters = [];
            sensors = [];
        },
        rows: function () {
            return rows;
        }
    };
})();