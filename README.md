# Rubik's Cube in Three.js

A little exploration into Three.js and 3d in general. I put together a simple Rubik's cube, with the intent to have it playable and maybe write some cube solving algorithms.


## Overview

The cube can currently be displayed with orbit controls, zoom in and out, and movements can be applied.

![cube1](https://user-images.githubusercontent.com/101033922/229326523-267783f7-9618-4e0f-8107-f296f74d2f27.gif)


However....

There is no internal representation for the cubes state, so to move the cube I am just rotating cubelets based off their starting coordinates,
which breaks almost immediately. I'll fix this when I have the chance.

![cubebroke](https://user-images.githubusercontent.com/101033922/229326703-8bd735b0-9724-4365-bf06-e155c78a22b1.gif)


## How to use?

### Prerequisites

Ensure that you have Node.js installed.

### Installation

Clone the repository:

```sh
git clone https://github.com/matthew-tyler/RubiksCube
```
Navigate to the project directory:

```sh
cd RubiksCube
```
Install the dependencies:

```sh
npm install
```

### Running the Project

To start the development server, run the following command:

```sh
npm run dev
```
The development server should now be running on http://localhost:3000 (or another available port, if 3000 is already in use). Open your browser and navigate to the provided URL to view play around

