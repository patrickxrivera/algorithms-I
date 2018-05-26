const getPermutations = require('../minilab/HeapsAlg.js');
const { initCities, calcDistance, formatShortestPath } = require('./helpers');

const FILE_NAME = 'usa115475.tsp';

const cities = initCities(FILE_NAME);

const App = {
  shortestDistance: Infinity,
  shortestPath: [],

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

  nearestNeighborsSearch(cities) {
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

(function init(cities) {
  App.nearestNeighborsSearch(cities);

  const shortestPath = formatShortestPath(App.shortestPath);

  console.log(`Shortest path is ${shortestPath}`);
})(cities);
