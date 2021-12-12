/* eslint-disable no-console, no-unused-vars */
const testData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testData2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const data = `KF-sr
OO-vy
start-FP
FP-end
vy-mi
vy-KF
vy-na
start-sr
FP-lh
sr-FP
na-FP
end-KF
na-mi
lh-KF
end-lh
na-start
wp-KF
mi-KF
vy-sr
vy-lh
sr-mi`;

const nodes = {
  start: 'start',
  end: 'end',
};

let segments;
let paths = [];

const segmentsFrom = (node) => segments
  .filter(segment => segment.includes(node))
  .map(segment => segment.filter(v => v !== node)[0]);

const numOccurrances = (path, testVal) => path
  .reduce(
    (acc, val) => (val === testVal ? acc + 1 : acc),
    0,
  );

const checkHasDouble = (path) => path
  .filter(testVal => testVal === testVal.toLowerCase())
  .some(testVal => numOccurrances(path, testVal) > 1);

const canVisit = (path, to, allowDouble = false) => {
  if (to === 'start') { return false; }
  const isLower = to === to.toLowerCase();
  const isIncludedLowerPath = isLower && path.includes(to);
  if (!allowDouble) { return !isIncludedLowerPath; }
  return checkHasDouble(path) ? !isIncludedLowerPath : true;
};

const tryAddDest = (path, to, allowDouble) => {
  // Don't add destination if cannot visit
  if (!canVisit(path, to, allowDouble)) { return; }

  // Add to path
  path.push(to);

  // Add to paths if at end, otherwise, try all next options
  if (to === nodes.end) {
    paths.push(path);
  } else {
    segmentsFrom(to).forEach(dest => tryAddDest([...path], dest, allowDouble));
  }
};

const loadData = (str, allowDouble) => {
  paths = [];
  segments = str.split('\n').map(row => row.split('-'));
  const segmentsFromStart = segmentsFrom(nodes.start);
  segmentsFromStart.forEach(
    dest => tryAddDest(['start'], dest, allowDouble),
  );
  return paths.length;
};

export default {
  loadTest: () => loadData(testData),
  loadTest2: () => loadData(testData2),
  loadData: () => loadData(data),
  loadDoubleData: () => loadData(data, true),
  loadTestDouble: () => loadData(testData, true),
};
