# Rubiks Cube in Three.js

A little exploration into Three.js and 3d in general. I put together a simple rubiks cube, with the intent to have it playable and maybe write some cube solving algorithms.


## Overview

The can currently be displayed with orbit controls, zoom in and out, and movements can be applied.






However....

There is no internal represenation for the cubes state, so to move the cube I am just rotating cubelets based off of their starting coordinates,
which breaks almost immedietely. I'll fix this when I have the chance.
