const getPermutations = (set, App, size = set.length) => {
  if (size === 1) {
    App.exhaustiveSearch(set);
    return;
  }
  for (let i = 0; i < size - 1; i++) {
    getPermutations(set, App, size - 1);

    if (size % 2 == 1) {
      const temp = set[0];
      set[0] = set[size - 1];
      set[size - 1] = temp;
    } else {
      const temp = set[i];
      set[i] = set[size - 1];
      set[size - 1] = temp;
    }
  }

  getPermutations(set, App, size - 1);
};

module.exports = getPermutations;
