/* eslint-disable no-nested-ternary */
const testData = `target area: x=20..30, y=-10..-5`;
const data = `target area: x=124..174, y=-123..-86`;

/*
 * 0,0 -   6,0
 * 6,0 -   5,-1
 * 11,-1 - 4,-2
 * 15,-3   3,-3
 * 18,-6   2,-4
 * 20,-10  1,-5
 * 21,-15  0,-6
 *
 */

/*
6: (10) [8, 3, 7, 4, 1, 2, 0, 5, 6, 9]
7: (11) [-1, 7, 3, 8, 1, 6, 4, 0, 5, 9, 2]
8: (4) [0, -1, 1, -2]
9: (3) [0, -2, -1]
10: (2) [-1, -2]
11: (4) [-2, -3, -4, -1]
12: (3) [-2, -3, -4]
13: (3) [-2, -4, -3]
14: (3) [-4, -3, -2]
15: (3) [-3, -4, -2]
20: (6) [-5, -10, -7, -8, -9, -6]
21: (6) [-7, -6, -9, -10, -5, -8]
22: (6) [-6, -5, -10, -8, -9, -7]
23: (6) [-10, -7, -9, -8, -6, -5]
24: (6) [-5, -6, -10, -8, -9, -7]
25: (6) [-9, -7, -5, -8, -6, -10]
26: (6) [-6, -10, -8, -7, -9, -5]
27: (6) [-5, -7, -6, -9, -10, -8]
28: (6) [-7, -8, -9, -6, -10, -5]
29: (6) [-6, -10, -8, -9, -7, -5]
30: (6) [-6, -10, -8, -7, -9, -5]
*/

let xVals;
let yVals;
let minX;
let maxPeak;
let lastPos;
let maxPeakLocation;
let numFound = 0;

const takeStep = ([px, py], [vx, vy]) => {
  const vxPos = vx > 0;
  const vxMod = (vx === 0 ? 0 : (vx > 0 ? -1 : 1));
  return [[px + vx, py + vy], [vx + vxMod, vy - 1]];
};

const isInArea = ([px, py]) => (
  px >= xVals[0]
  && px <= xVals[1]
  && py >= yVals[0]
  && py <= yVals[1]
);

const checkVel = (vel) => {
  let pos = [0, 0];
  lastPos = pos;
  let lands = false;
  const maxX = vel[0] * ((vel[0] + 1) / 2);
  const maxY = vel[1] * ((vel[1] + 1) / 2);
  if (maxX < xVals[0]) {
    return {
      lands: false,
      lastPos,
      maxY,
      maxX,
    };
  }
  const pxAtN = (n) => (n > vel[0] ? maxX : (
    Array.from({ length: n })
      .reduce((acc, v, index) => acc + vel[0] - index, 0)
  ));
  const pyAtN = (n) => (n < vel[1] ? (
    Array.from({ length: n })
      .reduce((acc, v, index) => acc + vel[1] - index, 0)
  ) : (
    Array.from({ length: n - vel[1] })
      .reduce((acc, v, index) => acc - index, maxY)
  ));

  const posAtN = (n) => [pxAtN(n), pyAtN(n)];
  let n = 0;
  while (
    (pos[1] > yVals[0] ? (pos[1] >= yVals[0]) : pos[1] <= yVals[0])
    && pos[0] <= xVals[1]
  ) {
    pos = posAtN(n);
    n++;
    if (isInArea(pos)) { lands = true; }
  }
  lastPos = pos;
  if (lands) {
    numFound++;
    if (maxY > maxPeak) {
      maxPeak = maxY;
      maxPeakLocation = vel;
    }
  }
  return {
    lands,
    lastPos,
    maxX,
    maxY,
  };
};

const load = (str) => {
  const words = str.replace(',', '').split(' ');
  xVals = words[2].split('x=')[1].split('..').map(Number);
  yVals = words[3].split('y=')[1].split('..').map(Number);
  minX = Math.ceil(Math.sqrt((8 * xVals[0]) - 1) / 2);
  const maxX = xVals[1];
  numFound = 0;
  maxPeak = 0;
  let x;

  for (x = 0; x <= xVals[1]; x++) {
    let landed = false;
    let i = -200;
    while (i < 200) {
      const step = checkVel([x, i]);
      if (!landed && step.lands) {
        landed = true;
      }
      i++;
    }
  }
  console.log({ maxPeak, maxPeakLocation, numFound });
};

export default {
  loadTest: () => load(testData),
  loadData: () => load(data),
};
