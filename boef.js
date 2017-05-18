// Module Boef
Boef = (function () {
    var emitters = [];
    var sensors = [];
    var rows = [];
    var singleRow = [];
    var radius = 6371000; //radius of Earth in meters
    var resourceSpeed = 1493;
    var soilSpeed = 4176;
    var resourceTime;

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
                pulse: function (pulseTime) {
                    var dist = this.distance();
                    resourceTime = (soilSpeed * pulseTime - dist) / (soilSpeed - resourceSpeed);
                },
                amountOfResourcesInMeters: function () {
                    return resourceTime * resourceSpeed;
                }
            });
        },
        placeSensors: function (latitude, longitude, number) {
            var latitudeDelta = latitude - emitters[0].latitude;
            var longitudeDelta = longitude - emitters[0].longitude;

            if (singleRow.length !== 0) {
                latitudeDelta = latitude - singleRow[singleRow.length-1].latitude;
                longitudeDelta = longitude - singleRow[singleRow.length-1].longitude;
            }

            singleRow.push({
                latitude: latitude,
                longitude: longitude,
                distance: function () {
                    var subFormulaA = hav(toRadians(this.latitude) - toRadians(emitters[0].latitude));
                    var subFormulaB = Math.cos(toRadians(this.latitude)) * Math.cos(toRadians(emitters[0].latitude));
                    var subFormulaC = hav(toRadians(this.longitude) - toRadians(emitters[0].longitude));

                    return 2 * radius * Math.asin(Math.sqrt(subFormulaA + (subFormulaB * subFormulaC)));
                },
                pulse: function (pulseTime) {
                    var dist = this.distance();
                    resourceTime = (soilSpeed * pulseTime - dist) / (soilSpeed - resourceSpeed);
                },
                amountOfResourcesInMeters: function () {
                    return resourceTime * resourceSpeed;
                }
            });


            if (number === 1) {
                rows.push(singleRow);
                return;
            }

            return this.placeSensors(latitude + latitudeDelta, longitude + longitudeDelta, number - 1);
        },
        sensors: function () {
            return sensors;
        },
        reset: function () {
            rows = [];
            singleRow = [];
            emitters = [];
            sensors = [];
        },
        rows: function () {
            return rows;
        }
    };
})();