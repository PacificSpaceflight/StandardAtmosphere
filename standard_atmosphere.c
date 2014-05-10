#include <stdio.h>
#include <math.h>

typedef struct atmosphere atmosphere;
struct atmosphere{
    double  temperature;    // celsius (288.15 in K)
    double  pressure;       // psi  (101325 N/m^2) or (1013.25 hPa)
    double  density;        // kg/m^3
    double  gravity;        // m/sec^2
    double  speed_of_sound; // m/sec
};

#define EARTH_RADIUS 6371000.0 // meters, for calculating gravity
#define REAL_GAS_CONSTANT 287.04 // earth air, m^2/Ksec^2
#define E 2.71828182845904523536028747135266250
#define METERS_TO_FEET 3.28084

atmosphere _sea_level_conditions(){
    atmosphere a;
    a.speed_of_sound = 340.294;
    a.gravity = 9.80665;
    a.pressure = 1013.25;
    a.temperature = 15;
    a.density = 1.225;
    return a;
}

atmosphere atmosphereAtAltitude(double altitude){
    struct atmosphere a;
    a = _sea_level_conditions();
    if(altitude < 0.0 || altitude > 20000.0) return a;   // calculations only valid between sea level and 20,000m
    else if(altitude < 11000.0){ // meters, (36,089 ft)
        a.pressure *= pow(1 - (0.0065 * altitude / (a.temperature+273.15)), 5.2561 ); // temp @ sea level
        a.temperature -= 6.5 * altitude / 1000.0; // -= 1.98 * altitude / 1000.0;// in ft
    }
    else{  // above the troposphere
        a.temperature = -56.5;  // C, or 216.65 K
        a.pressure = 226.32 * pow(E, -a.gravity*(altitude-11000)/(REAL_GAS_CONSTANT*216.65));
    }
    a.density = a.pressure/(REAL_GAS_CONSTANT*(a.temperature+273.15))*100.0;
    a.speed_of_sound = 331 + ( 0.6 * a.temperature );
    a.gravity *= pow( EARTH_RADIUS / (EARTH_RADIUS+altitude), 2);
    // cleanup and unit conversion
    a.pressure *= 0.014503773773;  // convert hPa to psi
    return a;
}

void log_atmosphere(atmosphere a){
    printf("temperature: %.3f C\n", a.temperature);
    printf("pressure: %f psi\n", a.pressure);
    printf("density: %f kg/m^3\n", a.density);
    printf("gravity: %f m/sec^2\n", a.gravity);
    printf("speed of sound: %f m/sec\n",a.speed_of_sound);
}