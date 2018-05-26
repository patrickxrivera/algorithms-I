const calcDistance = (cityA, cityB) =>
  Math.sqrt(((Number(cityA.x) - Number(cityB.x)) ^ 2) + ((Number(cityA.y) + Number(cityB.y)) ^ 2));

const renderAcc = (acc) => (typeof acc === 'object' ? acc.name : acc);

const format = (acc, curr) => `${renderAcc(acc)} ---> ${curr.name}`;

const formatShortestPath = (path) => path.reduce(format);

module.exports = {
  calcDistance,
  formatShortestPath
};
