const fs = require('fs');
const R = require('ramda');

const HEADER_LENGTH = 7;
const NUMBER_OF_CITIES = 100;

/*
============ initCities ============
*/

const initCities = (FILE_NAME) =>
  R.pipe(readFile, sliceCities, splitCities, formatCities)(FILE_NAME);

const readFile = (FILE_NAME) =>
  fs
    .readFileSync(FILE_NAME)
    .toString()
    .split('\n');

const sliceCities = (citiesRaw) =>
  citiesRaw.slice(0 + HEADER_LENGTH, NUMBER_OF_CITIES + HEADER_LENGTH);

// TODO: use R.transduce to DRY up the sequential map operations
const splitCities = (cities) => R.map(R.split(' '), cities);

const formatCities = (values) => R.map(getValues, values);

const getValues = ([name, x, y]) => ({ name, x, y });

/*
============ calcDistance ============
*/

const calcDistance = (cityA, cityB) =>
  Math.sqrt(((Number(cityA.x) - Number(cityB.x)) ^ 2) + ((Number(cityA.y) + Number(cityB.y)) ^ 2));

/*
============ formatShortestPath ============
*/

const formatShortestPath = (path) => path.reduce(format);

const format = (acc, curr) => `${renderAcc(acc)} ---> ${curr.name}`;

const renderAcc = (acc) => (typeof acc === 'object' ? acc.name : acc);

module.exports = {
  initCities,
  calcDistance,
  formatShortestPath
};
