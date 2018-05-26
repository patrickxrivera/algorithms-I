const fs = require('fs');

const getPermutations = require('../minilab/HeapsAlg.js');
const { calcDistance, formatShortestPath } = require('./helpers');

const HEADER_LENGTH = 7;
const NUMBER_OF_CITIES = 11;

const citiesRaw = fs
  .readFileSync('usa115475.tsp')
  .toString()
  .split('\n');

const citiesUnformatted = citiesRaw.slice(0 + HEADER_LENGTH, NUMBER_OF_CITIES + HEADER_LENGTH);

const cities = citiesUnformatted.map((city) => {
  const values = city.split(' ');
  return { name: values[0], x: values[1], y: values[2] };
});

const App = {
  shortestDistance: Infinity,
  shortestPath: null,

  exhaustiveSearch(set) {
    let currentDistance = 0;

    for (let i = 0; i < set.length - 1; i++) {
      const cityA = set[i];
      const cityB = set[i + 1];

      currentDistance += calcDistance(cityA, cityB);
    }

    if (currentDistance >= App.shortestDistance) return;

    App.shortestDistance = currentDistance;
    App.shortestPath = set;
  },

  tsp(cities) {
    const originalCitiesLength = cities.length;
    const path = [cities.shift()];
    const visited = {};

    while (path.length < originalCitiesLength) {
      const startCity = path[path.length - 1];
      let currShortestDistance = Infinity;
      let currShortestDistanceCity;

      cities.forEach((currCity) => {
        if (visited[currCity.name]) return;

        const currDistance = calcDistance(startCity, currCity);

        if (currDistance < currShortestDistance) {
          currShortestDistance = currDistance;
          currShortestDistanceCity = currCity;
        }
      });

      path.push(currShortestDistanceCity);
      visited[currShortestDistanceCity.name] = true;
    }

    App.shortestPath = path;
  }
};

(function init() {
  App.tsp(cities);

  const formattedShortestPath = formatShortestPath(App.shortestPath);

  console.log(`Shortest path is ${formattedShortestPath}`);
})();
