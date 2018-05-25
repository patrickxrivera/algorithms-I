const getPermutations = require('../minilab/HeapsAlg.js');

const cities = [
  { name: 'Denver', x: 500, y: 500 },
  { name: 'Salt Lake City', x: 300, y: 500 },
  { name: 'Cheyenne', x: 500, y: 600 },
  { name: 'Santa Fe', x: 500, y: 350 }
];

const calcDistance = (cityA, cityB) =>
  Math.sqrt(((cityA.x - cityB.x) ^ 2) + ((cityA.y + cityB.y) ^ 2));

const renderAcc = (acc) => (typeof acc === 'object' ? acc.name : acc);

const format = (acc, curr) => `${renderAcc(acc)} ---> ${curr.name}`;

const formatShortestPath = (path) => path.reduce(format);

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
  }
};

(function init() {
  getPermutations(cities, App);
  const formattedShortestPath = formatShortestPath(App.shortestPath);

  console.log(`Shortest distance is ${Math.round(App.shortestDistance)}km`);
  console.log(`Shortest path is ${formattedShortestPath}`);
})();
