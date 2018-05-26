const fs = require('fs');
const R = require('ramda');

const HEADER_LENGTH = 7;
const NUMBER_OF_CITIES = 100;

/*
============ initCities ============
*/

const readFile = (FILE_NAME) =>
  fs
    .readFileSync(FILE_NAME)
    .toString()
    .split('\n');

const sliceCities = (citiesRaw) =>
  citiesRaw.slice(0 + HEADER_LENGTH, NUMBER_OF_CITIES + HEADER_LENGTH);

const formatCities = (citiesUnformatted) =>
  citiesUnformatted.map((city) => {
    const values = city.split(' ');
    return { name: values[0], x: values[1], y: values[2] };
  });

const initCities = (FILE_NAME) => R.pipe(readFile, sliceCities, formatCities)(FILE_NAME);

/*
============ calcDistance ============
*/

const calcDistance = (cityA, cityB) =>
  Math.sqrt(((Number(cityA.x) - Number(cityB.x)) ^ 2) + ((Number(cityA.y) + Number(cityB.y)) ^ 2));

/*
============ formatShortestPath ============
*/

const renderAcc = (acc) => (typeof acc === 'object' ? acc.name : acc);

const format = (acc, curr) => `${renderAcc(acc)} ---> ${curr.name}`;

const formatShortestPath = (path) => path.reduce(format);

module.exports = {
  initCities,
  calcDistance,
  formatShortestPath
};
