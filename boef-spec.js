(function () {
    describe("The Boef namespace", function () {
        it("should exist", function () {
            expect(Boef).toBeDefined();
        })
    })

    describe("An emitter", function () {
        it("should be added", function () {
            Boef.placeEmitter(52.102403, 5.175269);
            expect(Boef.emitters().length).toBe(1);
        })
    })

    describe("The sensors", function () {
        it("should be added", function () {
            Boef.placeSensor(52.102001, 5.173681);
            Boef.placeSensor(52.101388, 5.176438);
            Boef.placeSensor(52.101019, 5.175151);
            expect(Boef.sensors().length).toBe(3);
        })
    })

    describe("The distance between sensor and emitter", function () {
        it("should reset on call", function () {
            Boef.reset();
            expect(Boef.sensors().length).toBe(0);
            expect(Boef.emitters().length).toBe(0);
        })
        it("should be about 100 meters distance apart", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            expect(Boef.sensors()[0].distance()).toBeCloseTo(100, 0);
        });
        it("should be about 200 meters distance apart", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.100552, 5.175363);
            expect(Boef.sensors()[0].distance()).toBeCloseTo(200, 0);
        });
        it("should be about 300 meters distance apart", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.099647, 5.175377);
            expect(Boef.sensors()[0].distance()).toBeCloseTo(300, 0);
        });
    })

    describe("Detecting of resources", function () {
        it("should detect 100 meters of normal soil", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0239463601532567);
            expect(Boef.sensors()[0].amountOfResourcesInMeters()).toBeCloseTo(0.00, 0);
        });

        it("should detect 100 meters of resources", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0669792364367046);
            expect(Boef.sensors()[0].amountOfResourcesInMeters()).toBeCloseTo(100.00, 0);
        });

        it("should detect 50 meters of resources", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0454627982949807);
            expect(Boef.sensors()[0].amountOfResourcesInMeters()).toBeCloseTo(50.00, 0);
        });

        it("should detect 20 meters of resources", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0325529354099463);
            expect(Boef.sensors()[0].amountOfResourcesInMeters()).toBeCloseTo(20.00, 0);
        });

        it("should detect 83 meters of resources", function () {
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensor(52.101448, 5.175354);
            Boef.sensors()[0].pulse(0.0596636474685185);
            expect(Boef.sensors()[0].amountOfResourcesInMeters()).toBeCloseTo(83.00, 0);
        })
    })

    describe("the placing of rows", function(){
        it("should exist", function(){
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensors(52.101448,5.175354, 1);
            expect(Boef.rows().length).toBe(1);
        });

        it("should contain a sensor", function(){
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensors(52.101448,5.175354, 1);
            expect(Boef.rows()[0].length).toBe(1);
        });

        it("should contain 10 sensors", function(){
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensors(52.101448,5.175354, 10);
            expect(Boef.rows()[0].length).toBe(10);
        });

        it("should contain a sequence of sensors with 100 meters of distance in between", function(){
            Boef.reset();
            Boef.placeEmitter(52.102346, 5.175269);
            Boef.placeSensors(52.101448,5.175354, 10);
            expect(Boef.rows()[0][0].distance()).toBeCloseTo(100, 0);
            expect(Boef.rows()[0][1].distance()).toBeCloseTo(200, 0);
            expect(Boef.rows()[0][2].distance()).toBeCloseTo(300, 0);
            expect(Boef.rows()[0][3].distance()).toBeCloseTo(400, 0);
            expect(Boef.rows()[0][4].distance()).toBeCloseTo(500, 0);
            expect(Boef.rows()[0][5].distance()).toBeCloseTo(600, 0);
            expect(Boef.rows()[0][6].distance()).toBeCloseTo(700, 0);
            expect(Boef.rows()[0][7].distance()).toBeCloseTo(800, 0);
            expect(Boef.rows()[0][8].distance()).toBeCloseTo(900, 0);
            expect(Boef.rows()[0][9].distance()).toBeCloseTo(1000, 0);
        });
    })
})();