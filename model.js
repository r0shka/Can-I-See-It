/**Mountain object**/
class Mountain  {
    constructor(name, long, lat, height, countryCode, score) {
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.height = height;
        this.countryCode = countryCode;
        this.score = score;
    }
}

/**City object**/
class City  {
    constructor(name, long, lat, countryCode, population) {
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.countryCode = countryCode;
        this.population = population;
    }
}

/**Camera object**/
class Camera {
    constructor(long, lat, height, countryCode) {
        this.long = long;
        this.lat = lat;
        this.height = height;
        this.countryCode = countryCode;
    }
}
