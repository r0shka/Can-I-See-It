/** distance between X and Y (long, lat) **/
function distance(x,y){
    var toRadians = function(num) {
        return num * Math.PI / 180;
    };
    var lat1 = x.lat;
    var lon1 = x.long;
    var lat2 = y.lat;
    var lon2 = y.long;

    var R = 6371; // km
    var phi1 = toRadians(lat1);
    var phi2 = toRadians(lat2);
    var delta1 = toRadians(lat2 - lat1);
    var delta2 = toRadians(lon2 - lon1);
    var a = Math.sin(delta1 / 2) * Math.sin(delta1 / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(delta2 / 2) * Math.sin(delta2 / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**takes a Mountain object as parameter**/
function addMountainLabel(mountain, viewer) {
    viewer.entities.add({
        name : mountain.name,
        description: '<u>Information</u><br>' +
            '<p style="margin-left: 5%">Longitude: ' +mountain.long+ '<br>' +
            'Latitude: ' +mountain.lat+ '<br>' +
            'Elevation: ' +mountain.height+'m</p><br>' +
            'La montagne se trouve à '+distance(viewCamera, mountain).toFixed(0)+' km',
        position : Cesium.Cartesian3.fromDegrees(mountain.long, mountain.lat, mountain.height),
        point : {
            pixelSize : 5,
            color : Cesium.Color.RED,
            outlineColor : Cesium.Color.WHITE,
            outlineWidth : 2
        }
    });
}

/**takes a City object as parameter**/
function addCityLabel(city, viewer) {
    viewer.entities.add({
        name : city.name,
        description: '<u>Information</u><br>' +
            '<p style="margin-left: 5%">Longitude: ' +city.long+ '<br>' +
            'Latitude: ' +city.lat+ '<br>' +
            'Population: '+city.population+ '</p><br>'+
            'La ville se trouve à '+distance(viewCamera, city).toFixed(0)+' km',
        position : Cesium.Cartesian3.fromDegrees(city.long, city.lat),
        point : {
            pixelSize : 5,
            color : Cesium.Color.BLUE,
            outlineColor : Cesium.Color.WHITE,
            outlineWidth : 2
        }
    });
}


