/* eslint-disable no-trailing-spaces, max-classes-per-file, no-use-before-define */

const testData = `[1,2]
[[1,2],3]
[9,[8,7]]
[[1,9],[8,5]]
[[[[1,2],[3,4]],[[5,6],[7,8]]],9]
[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]`;

const testData2 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`;

const simpleLists = [
  `[1,1]
[2,2]
[3,3]
[4,4]`,
  `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`,
  `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`,
`[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`,
];


const data = `[[4,[3,[2,8]]],[[[8,5],4],[[3,5],[4,9]]]]
[[[8,[6,8]],2],[4,[[1,0],[4,5]]]]
[[4,3],[[[3,3],[1,8]],[[0,8],[5,8]]]]
[[[8,[5,8]],[[8,7],[2,1]]],[3,[[0,3],1]]]
[[9,[[9,2],3]],[3,[[9,7],[2,8]]]]
[[[7,[0,0]],[[4,3],[6,3]]],[6,[4,5]]]
[[[[4,2],[0,0]],[4,2]],[[[8,7],8],[[9,4],5]]]
[[4,[1,[1,1]]],[[[0,6],8],[[7,5],[7,3]]]]
[[[1,[9,9]],[4,3]],[[1,[5,8]],9]]
[[2,[6,[6,7]]],[[6,[1,5]],8]]
[4,[[[9,8],[1,3]],[7,[7,4]]]]
[[[[2,6],8],2],[[[2,2],8],[[3,7],8]]]
[[[[1,5],2],[[8,9],[8,3]]],[[[7,3],[1,1]],[[3,7],7]]]
[[[4,4],[8,9]],[5,3]]
[[[[1,4],[4,5]],9],[[2,8],0]]
[[[[4,4],[7,3]],[[9,7],[3,9]]],[9,[5,[5,1]]]]
[[5,[[5,9],6]],[[[5,9],[6,3]],1]]
[[[[1,0],[1,6]],5],[1,9]]
[[[[6,3],[7,2]],1],[[0,6],6]]
[[[3,4],[4,0]],[[[6,4],[2,0]],[7,[7,2]]]]
[[[[1,3],[9,6]],[[1,1],[9,3]]],[[3,8],[[9,5],2]]]
[[[[9,4],6],5],[[[7,6],[2,3]],[6,6]]]
[[6,[2,[0,7]]],[[3,0],[8,[1,9]]]]
[[[6,0],[1,7]],[[[4,2],[5,7]],[[5,0],9]]]
[[[7,[4,9]],0],[[5,[7,5]],[8,[5,1]]]]
[[[[6,1],[8,0]],[3,[4,5]]],[[[8,3],4],[0,2]]]
[[[[3,8],5],[4,8]],9]
[[0,[7,[9,4]]],[2,2]]
[[[[9,6],[4,0]],[1,1]],[3,[[3,6],8]]]
[[[6,[3,3]],[[7,6],3]],[[[2,8],[0,7]],3]]
[[[[3,2],[2,4]],[[8,7],7]],[[[0,2],[1,3]],[8,3]]]
[[[[4,2],[6,8]],6],[[[2,1],[0,3]],[[6,6],[5,6]]]]
[[[[9,0],[1,7]],[[0,3],1]],[[0,[4,3]],7]]
[[[1,[1,4]],1],[[[8,1],9],[[7,1],[7,2]]]]
[2,[2,[[4,2],2]]]
[6,0]
[[[[9,7],7],[2,3]],[[8,[9,4]],[2,3]]]
[[[[4,5],8],6],[5,9]]
[[[5,[6,7]],[[1,9],[8,6]]],7]
[7,[[0,5],4]]
[[[2,4],[2,[1,9]]],[8,[5,6]]]
[3,[[6,[4,8]],[[3,0],9]]]
[[[[4,4],[0,5]],[7,3]],[1,[4,5]]]
[8,[[2,[1,1]],9]]
[[[[5,6],[5,1]],[[7,6],[8,8]]],[2,[[2,1],[3,1]]]]
[[0,[2,[4,6]]],[[[6,0],[3,9]],[0,[1,6]]]]
[[[6,[9,5]],[0,[9,4]]],0]
[[[[5,6],[7,8]],[7,[8,8]]],[[7,[4,7]],[[3,9],7]]]
[1,0]
[[7,2],[9,[3,0]]]
[[[[4,8],9],[1,[0,4]]],[[[5,2],0],8]]
[[[9,[2,5]],[2,[5,8]]],[1,6]]
[[[[0,5],1],[0,4]],7]
[8,[5,9]]
[[[[8,8],[4,8]],[[7,8],7]],[[0,4],8]]
[[[0,6],[9,6]],2]
[[[[2,5],[0,6]],8],[[8,9],1]]
[[[0,9],[1,[1,2]]],[[[4,1],6],7]]
[[[[5,7],[4,6]],[[6,3],[8,2]]],[[[2,5],[0,9]],[5,1]]]
[[[5,0],[[4,5],[6,2]]],[[[1,7],[3,0]],[[8,2],[6,1]]]]
[[[[8,9],9],[9,0]],[4,[[7,2],9]]]
[[[[2,3],[0,5]],[8,8]],[9,[[9,1],8]]]
[[[5,9],[0,[6,2]]],[[3,2],[[1,2],[9,5]]]]
[[[5,2],[8,[0,0]]],[[6,9],[4,[8,4]]]]
[7,3]
[[[6,4],[[0,4],7]],[[5,[0,3]],[8,7]]]
[[1,2],[[3,[5,9]],0]]
[[[6,9],[3,0]],[[[2,1],4],6]]
[[[8,[7,9]],1],[[[2,2],8],8]]
[[[0,1],[6,[3,3]]],5]
[[[[3,9],0],7],2]
[[[3,0],[1,[7,6]]],0]
[[[[3,5],3],8],[[[1,2],[8,8]],[[1,6],[8,1]]]]
[[[9,7],[[1,3],[6,9]]],6]
[[[[1,8],1],[[6,4],[1,8]]],[[[1,7],[5,9]],[[7,0],0]]]
[[[1,[9,3]],[4,0]],7]
[[5,[9,6]],[[4,[0,8]],2]]
[3,[[1,0],[0,2]]]
[[[3,1],[2,7]],[[4,4],5]]
[[8,6],[[4,[5,9]],[[3,7],9]]]
[[[3,2],2],[[3,9],8]]
[[[[4,5],[4,5]],[[0,2],[7,0]]],[[1,4],2]]
[7,[[8,[3,8]],[[5,6],4]]]
[[[[2,8],[2,2]],[[4,4],0]],[[2,[8,0]],2]]
[4,[[[8,8],0],[[1,8],[4,6]]]]
[[[5,[1,2]],7],9]
[[9,[[0,0],9]],[[5,[1,3]],[4,[4,7]]]]
[[3,4],[8,[2,[9,6]]]]
[[[[3,0],1],[[7,6],[5,2]]],[[[9,9],[9,2]],[0,[2,2]]]]
[[[[0,8],[6,1]],[2,0]],[6,[[8,8],[9,1]]]]
[[[5,[1,9]],6],6]
[[[3,5],[[9,9],[2,2]]],[[1,0],4]]
[[4,0],[2,[[8,8],[5,4]]]]
[[6,1],5]
[[[2,[3,7]],0],[1,5]]
[[[[5,9],[5,3]],[6,2]],[[7,9],4]]
[[[5,[0,9]],[[5,6],3]],[3,[7,8]]]
[8,[[[4,6],5],[0,2]]]
[[[0,[6,2]],[6,[6,6]]],[[3,1],6]]
[1,[[6,4],[0,6]]]`;

const loadList = (str) => {
  const numbers = str.split('\n');
  return numbers.map(JSON.parse);
};

/*
 * [1, 2] + [[3, 4], 5] => [[1, 2], [[3, 4], 5]
 * a + b = reduce([a, b]);
 *
 * while (any explodesOrSplits)
 *   If any pair is nested inside 4 pairs, leftmost explodes
 *   If any reg number is >10 the leftmost splits
 *
 * Explode:
 *   prev reg num (if any) += p[0]
 *   next reg num (if any) += p[1]
 *   p = 0
 */

class Node {
  constructor() {
    this.depth = 0;
    this.value = null;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  get magnitude() {
    return this.value !== null 
      ? this.value 
      : (this.left.magnitude * 3 + this.right.magnitude * 2);
  }

  get disp() {
    if (this.value !== null) {
      return this.value;
    }
    return [this.left.disp, this.right.disp];
  }

  get nextToExplode() {
    if (this.value !== null) {
      return null;
    }
    if (this.depth === 4) {
      return this;
    }
    const leftExplode = this.left.nextToExplode;
    const rightExplode = this.right.nextToExplode;
    if (leftExplode !== null && leftExplode.value === null) {
      return leftExplode;
    }
    if (rightExplode !== null && rightExplode.value === null) {
      return rightExplode;
    }
    return null;
  }

  get nextToSplit() {
    if (this.value !== null) {
      return (this.value >= 10) ? this : null;
    }
    const leftSplit = this.left.nextToSplit;
    if (leftSplit !== null) { return leftSplit; }

    const rightSplit = this.right.nextToSplit;
    if (rightSplit !== null) { return rightSplit; }
    return null;
  }

  get rightmostValue() {
    return this.value !== null ? this : this.right.rightmostValue;
  }

  get leftmostValue() {
    return this.value !== null ? this : this.left.leftmostValue;
  }

  get toLeft() {
    if (this.parent) {
      return this.parent.left === this
        ? this.parent.toLeft
        : this.parent.left.rightmostValue;
    }
    return null;
  }

  get toRight() {
    if (this.parent) {
      return this.parent.right === this
        ? this.parent.toRight
        : this.parent.right.leftmostValue;
    }
    return null;
  }

  mkNode(value) {
    const node = new Node();
    node.parent = this;
    node.depth = this.depth + 1;
    node.value = value;
    return node;
  }

  reduce() {
    let done = false;
    while (!done) {
      done = true;
      const toExplode = this.nextToExplode;
      const toSplit = this.nextToSplit;
      if (toExplode !== null) {
        done = false;
        toExplode.explode();
      } else if (toSplit !== null) {
        done = false;
        toSplit.split();
      }
    }
    return this;
  }

  explode() {
    if (this.toLeft !== null) {
      this.toLeft.value += this.left.value;
    }
    if (this.toRight !== null) {
      this.toRight.value += this.right.value;
    }
    this.left = null;
    this.right = null;
    this.value = 0;
  }

  split() {
    this.left = this.mkNode(Math.floor(this.value / 2));
    this.right = this.mkNode(Math.ceil(this.value / 2));
    this.value = null;
  }
}

const loadNode = (depth, from) => {
  const node = new Node();
  node.depth = depth;
  if (typeof from === 'number') {
    node.value = from;
  } else {
    const leftChild = loadNode(depth + 1, from[0]);
    leftChild.parent = node;
    node.left = leftChild;
    const rightChild = loadNode(depth + 1, from[1]);
    rightChild.parent = node;
    node.right = rightChild;
  }
  return node;
};

const loadData = (str) => {
  const numbers = loadList(str);
  let curr = null;
  numbers.forEach(number => {
    if (curr === null) {
      curr = loadNode(0, number);
    } else {
      const right = loadNode(0, number);
      const main = new Node();
      main.left = curr;
      curr.parent = main;
      main.right = right;
      right.parent = main;
      curr = loadNode(0, main.disp);
    }
    curr.reduce();
  });
  return curr.magnitude;
};

const add = (p1, p2) => {
  const adder = new Node();
  adder.left = loadNode(0, p1);
  adder.left.parent = adder;
  adder.right = loadNode(0, p2);
  adder.right.parent = adder;
  const node = loadNode(0, adder.disp);
  node.reduce();
  return node.magnitude;
};

const findMaxSum = (str) => {
  const numbers = loadList(str);
  let largest = 0;
  numbers.forEach((number, index) => {
    for (let i = index; i < numbers.length; i++) {
      const magnitude = add(number, numbers[i]);
      if (magnitude > largest) {
        largest = magnitude;
      }
    }
  });
  return largest;
}


export default {
  loadTest: () => loadData(testData2),
  loadData: () => loadData(data),
  findMaxSum: () => findMaxSum(data),

};
