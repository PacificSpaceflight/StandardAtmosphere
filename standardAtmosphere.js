// international standard atmosphere, good to 20,000 m
// robby kraft
// mit open source software license

var EARTH_RADIUS = 6371000.0;   // meters
var REAL_GAS_CONSTANT = 287.04 // earth air, m^2/Ksec^2
var E = 2.71828182845904523536028747135266250;
var METERS_TO_FEET = 3.28083989501312;
var HPA_TO_PSI = 0.014503773773;
// CONDITIONS AT ALTITUDE 0
var SEA_LEVEL_PRESSURE = 1013.25;
var SEA_LEVEL_TEMPERATURE = 15;
var SEA_LEVEL_GRAVITY = 9.80665;
var SEA_LEVEL_DENSITY = 1.225;
var SEA_LEVEL_SPEED_OF_SOUND = 340.294;

function Atmosphere(){
    var temperature;    // celsius (288.15 in K)
    var pressure;       // psi  (101325 N/m^2) or (1013.25 hPa)
    var density;        // kg/m^3
    var gravity;        // m/sec^2
    var speed_of_sound; // m/sec
};

// altitude in meters
function atmosphereAtAltitude(altitude){
    var a = new Atmosphere();
    if(altitude < 0.0 || altitude > 20000.0) return a;   // calculations only valid between sea level and 20,000m
    a.gravity = SEA_LEVEL_GRAVITY * Math.pow( EARTH_RADIUS / (EARTH_RADIUS+altitude), 2);
    if(altitude < 11000.0){ // meters, (36,089 ft)
        a.temperature = SEA_LEVEL_TEMPERATURE - 6.5 * altitude / 1000.0; // -= 1.98 * altitude / 1000.0; if using feet
        a.pressure = SEA_LEVEL_PRESSURE * Math.pow(1 - (0.0065 * altitude / (SEA_LEVEL_TEMPERATURE+273.15)), 5.2561 );
    }
    else{  // above the troposphere
        a.temperature = -56.5;  // C, or 216.65 K
        a.pressure = 226.32 * Math.pow(E, -a.gravity*(altitude-11000)/(REAL_GAS_CONSTANT*216.65));
    }
    a.density = a.pressure/(REAL_GAS_CONSTANT*(a.temperature+273.15))*100.0;
    a.speed_of_sound = 331 + ( 0.6 * a.temperature );
    a.pressure *= HPA_TO_PSI;
    return a;
}

// altitude in meters
function speedOfSoundAtAltitude(altitude){
    if(altitude < 0.0 || altitude > 20000.0)
        return -1;
    else if(altitude < 11000.0)
        return 331 + ( 0.6 * (SEA_LEVEL_TEMPERATURE - 6.5 * altitude / 1000.0) );
    else
        return 331 + ( 0.6 * -56.5 );
}

// altitude in meters
function gravityAtAltitude(altitude){
    return SEA_LEVEL_GRAVITY * Math.pow( EARTH_RADIUS / (EARTH_RADIUS+altitude), 2);
}

// altitude in meters
function temperatureAtAltitude(altitude){
    if(altitude < 0.0 || altitude > 20000.0)
        return -1;
    else if(altitude < 11000.0)
        return SEA_LEVEL_TEMPERATURE - 6.5 * altitude / 1000.0;
    else
        return -56.5;
}

// altitude in meters
function pressureAtAltitude(altitude){
    if(altitude < 0.0 || altitude > 20000.0)
        return -1;
    else if(altitude < 11000.0)
        return SEA_LEVEL_PRESSURE * Math.pow(1 - (0.0065 * altitude / ((SEA_LEVEL_TEMPERATURE-(6.5*altitude/1000.0) )+273.15)), 5.2561 ) * HPA_TO_PSI;
    else
        return 226.32 * Math.pow(E, -(SEA_LEVEL_GRAVITY * Math.pow( EARTH_RADIUS / (EARTH_RADIUS+altitude), 2))*(altitude-11000)/(REAL_GAS_CONSTANT*216.65)) * HPA_TO_PSI;
}

// altitude in meters
function densityAtAltitude(altitude){
    var temperature = SEA_LEVEL_TEMPERATURE;
    var pressure = SEA_LEVEL_PRESSURE;
    var gravity = SEA_LEVEL_GRAVITY;
    if(altitude < 0.0 || altitude > 20000.0)
        return -1;
    else if(altitude < 11000.0){
        temperature -= 6.5 * altitude / 1000.0;
        pressure *= Math.pow(1 - (0.0065 * altitude / (SEA_LEVEL_TEMPERATURE+273.15)), 5.2561 );
    }
    else{
        temperature = -56.5;
        pressure = 226.32 * Math.pow(E, -gravity*(altitude-11000)/(REAL_GAS_CONSTANT*216.65));
    }
    return pressure/(REAL_GAS_CONSTANT*(temperature+273.15))*100.0;
}
