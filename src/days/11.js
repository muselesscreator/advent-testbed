/* eslint-disable no-console */
const simpleData = `11111
19991
19191
19991
11111`;

const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const data = `3322874652
5636588857
7755117548
5854121833
2856682477
3124873812
1541372254
8634383236
2424323348
2265635842`;

const key = (x, y) => `${x},${y}`;
const loadKey = (keyStr) => keyStr.split(',').map(Number);
const neighbors = (keyStr) => (
  [-1, 0, 1].reduce((acc, dx) => ([
    ...acc,
    ...[-1, 0, 1].reduce((acc2, dy) => ([...acc2, [dx, dy]]), []),
  ]), []).map(
    ([dx, dy]) => [loadKey(keyStr).x + dx, loadKey(keyStr).y + dy],
  ).filter(
    ([nx, ny]) => (Math.min(nx, ny) >= 0 && Math.max(nx, ny) < 10),
  )
);
const indices = (size) => Array.from(Array(size).keys());

let totalFlashes = 0;

const loadJellies = (str, size, findSync) => {
  const energies = str.split('\n').map(row => row.split('').map(Number));

  let flashes = [];
  let newFlashes;

  const shouldFlash = (x, y) => (energies[x][y] > 9 && !flashes.includes(key(x, y)));
  const bumpEnergy = (x, y) => energies[x][y]++;
  const flash = (x, y) => {
    totalFlashes++;
    newFlashes.push((key(x, y)));
    flashes.push(key(x, y));
  };
  const resetEnergy = (flashKey) => {
    const [x, y] = loadKey(flashKey);
    energies[x][y] = 0;
  };
  const checkForFlashes = () => {
    newFlashes = [];
    energies.forEach((row, x) => row.forEach((v, y) => shouldFlash(x, y) && flash(x, y)));
    newFlashes.forEach(newFlash => neighbors(newFlash).forEach(([nx, ny]) => bumpEnergy(nx, ny)));
    if (newFlashes.length) {
      checkForFlashes();
    }
  };

  let step = 0;
  const takeStep = () => {
    step++;
    flashes = [];
    indices(size).forEach(i => indices(size).forEach(j => bumpEnergy(i, j)));
    checkForFlashes();
    flashes.forEach(resetEnergy);
  };

  if (findSync) {
    while (flashes.length !== size * size) { takeStep(); }
    return step;
  }

  while (step <= 100) { takeStep(); }
  return totalFlashes;
};

export default {
  loadTest: () => loadJellies(testData, 10),
  loadSimpleTest: () => loadJellies(simpleData, 5),
  loadData: () => loadJellies(data, 10),
  findSyncTest: () => loadJellies(testData, 10, true),
  findSync: () => loadJellies(data, 10, true),
};
