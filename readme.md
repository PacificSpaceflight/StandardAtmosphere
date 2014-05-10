# international standard atmosphere

atmosphere data for an altitude in meters (range 0 to 20,000)

# properties

```c
double  temperature;    // celsius
double  pressure;       // psi
double  density;        // kg/m^3
double  gravity;        // m/sec^2
double  speed_of_sound; // m/sec
```

# methods

```c
atmosphereAtAltitude(double altitude);
```

# sources

[International Standard Atmosphere, Mustafa Cavcar](http://fisicaatmo.at.fcen.uba.ar/practicas/ISAweb.pdf)

various wikipedia pages

# license

MIT