/*
Developed by ADLI Hind and ROSHKA Vadym
 */

/**set viewer and UI**/
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhOTMwZTdkNy1iNzI3LTRmOWQtOWM5ZS1mOTJkNjk3MGMyZGQiLCJpZCI6MTAyMDYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTU5NDM3MDJ9.la5wdlmNsi4nYmfImtYtZxpPUnVsBrboGvqRKcQtoNo';
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    infoBox: true,
    sceneModePicker: false,
    selectionIndicator: true,
    timeline: false,
    navigationHelpButton: false
});


/**disable focus on object by double click**/
viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

/**Ajout de la boussole**/
viewer.extend(Cesium.viewerCesiumNavigationMixin);

var scene = viewer.scene;

/**remove fog**/
scene.skyAtmosphere.show = true;
scene.fog.enabled = false;
scene.globe.showGroundAtmosphere = true;

/** disable camera controls **/
scene.screenSpaceCameraController.enableRotate = false;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = false;
scene.screenSpaceCameraController.enableTilt = false;
scene.screenSpaceCameraController.enableLook = false;


/**la liste des objets visible**/
var mountainsAndCitiesArray = [];

/*global Cesium camera object*/
var camera = viewer.camera;

/*Default FOV*/
camera.frustum.fov = Cesium.Math.PI_OVER_TWO;

function setFOVtwo() {
    camera.frustum.fov = Cesium.Math.PI_OVER_TWO;
}

function setFOVthree() {
    camera.frustum.fov = Cesium.Math.PI_OVER_THREE;
}

var zoomClickCounter = 0;

function moveCameraLeft() {
    if(zoomClickCounter===0)
        camera.lookRight(75);
    else if(zoomClickCounter<0){
        camera.zoomIn(-3000*zoomClickCounter);
        camera.lookRight(-75);
        camera.zoomIn(3000*zoomClickCounter);
    }
    else{
        camera.zoomIn(-3000*zoomClickCounter);
        camera.lookRight(75);
        camera.zoomIn(3000*zoomClickCounter);
    }
}

function moveCameraRight() {
    if(zoomClickCounter===0)
        camera.lookRight(-75);
    else if(zoomClickCounter<0){
        camera.zoomIn(-3000*zoomClickCounter);
        camera.lookRight(75);
        camera.zoomIn(3000*zoomClickCounter);
    }
    else{
        camera.zoomIn(-3000*zoomClickCounter);
        camera.lookRight(-75);
        camera.zoomIn(3000*zoomClickCounter);
    }
}

function zoomCameraIn() {
    camera.zoomIn(3000);
    zoomClickCounter++;
}

function zoomCameraOut() {
    camera.zoomOut(3000);
    zoomClickCounter--;
}

function resetCamera(){
    camera.zoomIn(-3000*zoomClickCounter);
    zoomClickCounter=0;
}

function density() {
    var maxScore = document.getElementById("distanceRange").value;
    viewer.entities.removeAll();
    mountainsAndCitiesArray.forEach(function (item) {
        if(item instanceof Mountain) {
            if (item.score < maxScore)
                addMountainLabel(item, viewer);
        } else {
            switch (maxScore) {
                case '0': break;
                case '10': if(item.population > 25000)addCityLabel(item, viewer); break;
                case '20': if(item.population < 50000) addCityLabel(item, viewer); break;
                case '30': if(item.population < 100000) addCityLabel(item, viewer); break;
                case '40': if(item.population < 200000) addCityLabel(item, viewer);  break;
                case '50': if(item.population < 300000) addCityLabel(item, viewer); break;
                case '60': if(item.population < 400000) addCityLabel(item, viewer); break;
                case '70': if(item.population < 500000) addCityLabel(item, viewer); break;
                case '80': if(item.population < 600000) addCityLabel(item, viewer); break;
                case '90': if(item.population < 700000) addCityLabel(item, viewer); break;
                case '100': if(item.population < 800000) addCityLabel(item, viewer); break;
                case '110': if(item.population < 900000) addCityLabel(item, viewer); break;
                case '120': if(item.population < 1000000) addCityLabel(item, viewer); break;
                case '130': if(item.population < 2000000) addCityLabel(item, viewer); break;
                case '140': if(item.population < 4000000) addCityLabel(item, viewer); break;
                case '150': addCityLabel(item, viewer); break;
                default: addCityLabel(item, viewer); break;
            }
        }
    });
}

/**global Camera object, location and height**/
var viewCamera;

/** downloading list of neighbours, mountains and cities for each neighbour **/
function downloadNeighbours(country){
    downloadMountains(country);
    downloadCities(country);
    const url = 'https://secure.geonames.org/neighboursJSON?country='+country+'&username=dubtype';
    fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            res.geonames.forEach(function (item) {
                downloadMountains(item.countryCode);
                downloadCities(item.countryCode);
            })
        });
}

/** downloading list of mountains, adding them to a viewer and global array **/
function downloadMountains(country){
    const url = 'https://secure.geonames.org/search?q=&featureCode=MT&maxRows=999&type=json&style=FULL&country='+country+'&username=dubtype';
    fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            res.geonames.forEach(function (item) {
                var m = new Mountain(item.asciiName, item.lng, item.lat, item.elevation+50, item.countryCode, item.score);
                var dist = distance(m,viewCamera);
                if(dist < 200 && dist > 0.1){
                    mountainsAndCitiesArray.push(m);
                    addMountainLabel(m, viewer);
                }
            })
        });
}

/** downloading list of cities, adding them to a viewer and global array **/
function downloadCities(country){
    const url = 'https://secure.geonames.org/search?q=&featureCode=PPL&featureCode=PPLA&featureCode=PPLA2&featureCode=PPLA3&featureCode=PPLA4&featureCode=PPLC&maxRows=999&type=json&style=LONG&country='+country+'&orderby=population&cities=cities15000&username=dubtype';
    fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            res.geonames.forEach(function (item) {
                var c = new City(item.name, item.lng, item.lat, item.countryCode, item.population);
                if(distance(c,viewCamera) < 200){
                    mountainsAndCitiesArray.push(c);
                    addCityLabel(c, viewer);
                }
            })
        });
}

/** country of coord **/
function coordToCountry(cameraLat, cameraLong, height){
    const url = 'https://secure.geonames.org/countryCode?lat='+cameraLat+'&lng='+cameraLong+'&username=dubtype&type=json';
    fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            viewCamera = new Camera(cameraLong, cameraLat, height, res.countryCode);
            downloadNeighbours(viewCamera.countryCode);
            positionCamera();
        });
}

/** transforming name into coord (only for mountains) **/
function nameToCoord(){
    var name = document.getElementById("mountainName").value;
    var cameraLong = document.getElementById("long").value;
    var cameraLat = document.getElementById("lat").value;
    var height = document.getElementById("height").value;
    if(name === "") {
        if (cameraLong === "" || cameraLat === "" || height === "") {
            return;
        } else {
            coordToCountry(cameraLat, cameraLong, height);
            return;
        }
    }
    const url = 'https://secure.geonames.org/search?q='+name+'&maxRows=1&username=dubtype&featureCode=MT&type=json&style=FULL';
    fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{
            if(res.geonames.length===1) {
                viewer.entities.removeAll();
                var m = new Mountain(res.geonames[0].name, res.geonames[0].lng, res.geonames[0].lat, res.geonames[0].elevation + 50);
                viewCamera = new Camera(res.geonames[0].lng, res.geonames[0].lat, res.geonames[0].elevation + 50, res.geonames[0].countryCode);
                downloadNeighbours(viewCamera.countryCode);
                positionCamera();
            } else {
                $(document).ready(function(){
                    $('.toast').toast('show');
                });
            }
        });
}

/** fly camera to a location **/
function positionCamera(){
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(viewCamera.long, viewCamera.lat, viewCamera.height),
        orientation: {
            heading : Cesium.Math.toRadians(0), // east, default value is 0.0 (north)
            pitch : Cesium.Math.toRadians(0),    // default value (looking down)
            roll : 0.0                             // default value
        },
        duration: 5,
        pitchAdjustHeight: Cesium.Math.toRadians(90)
    });
}
