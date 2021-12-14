const testData = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const data = `SNPVPFCPPKSBNSPSPSOF

CF -> N
NK -> B
SF -> B
HV -> P
FN -> S
VV -> F
FO -> F
VN -> V
PV -> P
FF -> P
ON -> S
PB -> S
PK -> P
OO -> P
SP -> F
VF -> H
OV -> C
BN -> P
OH -> H
NC -> F
BH -> N
CS -> C
BC -> N
OF -> N
SN -> B
FP -> F
FV -> K
HP -> H
VB -> P
FH -> F
HF -> P
BB -> O
HH -> S
PC -> O
PP -> B
VS -> B
HC -> H
NS -> N
KF -> S
BO -> V
NP -> S
NF -> K
BS -> O
KK -> O
VC -> V
KP -> K
CK -> P
HN -> F
KN -> H
KH -> N
SB -> S
NO -> K
HK -> H
BF -> V
SV -> B
CV -> P
CO -> P
FC -> O
CP -> H
CC -> N
CN -> P
SK -> V
SS -> V
VH -> B
OS -> N
FB -> H
NB -> N
SC -> K
NV -> H
HO -> S
SO -> P
PH -> C
VO -> O
OB -> O
FK -> S
PN -> P
VK -> O
NH -> N
OC -> B
BP -> O
PF -> F
KB -> K
KV -> B
PO -> N
NN -> K
CH -> O
KC -> P
OP -> V
VP -> F
OK -> P
FS -> K
CB -> S
HB -> N
KS -> O
BK -> C
BV -> O
SH -> H
PS -> N
HS -> K
KO -> N`;

let template;
let rules;
let rulesDict;

let current;
let chars = [];
let pairs = {};

const getChars = () => {
  chars = [];
  const tryAdd = (v) => !chars.includes(v) && chars.push(v);
  rules.forEach((rule) => {
    rule[0].split('').forEach(tryAdd);
    tryAdd(rule[1]);
  });
  template.split('').forEach(tryAdd);
};

const getPairs = () => {
  pairs = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = [template[i], template[i + 1]].join('');
    const val = pairs[pair];
    pairs[pair] = val ? val + 1 : 1;
  }
};

const extrema = () => {
  let min;
  let max;
  let maxChar;
  let minChar;
  let totalChars = 0;
  chars.forEach(char => {
    let num = 0;
    Object.keys(pairs).forEach(pair => {
      const pairVal = pairs[pair] || 0;
      if (pair === `${char}${char}`) {
        num += pairVal;
      } else if (pair.includes(char)) {
        num += pairVal / 2;
      }
    });

    if (template[0] === char) { num += 0.5; }
    if (template[template.length - 1] === char) { num += 0.5; }

    if (!max || num > max) {
      maxChar = char;
      max = num;
    }
    if (!min || num < min) {
      minChar = char;
      min = num;
    }
    totalChars += num;
  });
  return { min, max, totalChars };
};

const takeStep = () => {
  const adds = rules.reduce((acc, rule) => ({ ...acc, [rule[0]]: 0 }), {});
  rules.forEach(rule => {
    if (pairs[rule[0]]) {
      adds[rule[0]] = pairs[rule[0]];
    }
  });
  Object.keys(adds).forEach(pair => {
    const num = adds[pair];
    pairs[pair] -= num;
    const p0 = [pair[0], rulesDict[pair]].join('');
    const p1 = [rulesDict[pair], pair[1]].join('');
    [p0, p1].forEach(newPair => {
      if (pairs[newPair]) {
        pairs[newPair] += num;
      } else {
        pairs[newPair] = num;
      }
    });
  });
};

const loadData = (str, steps) => {
  [template, rules] = str.split('\n\n');
  rules = rules.split('\n').map(rule => rule.split(' -> '));
  rulesDict = rules.reduce((acc, rule) => ({ ...acc, [rule[0]]: rule[1] }), {});
  getChars();
  getPairs();

  template = template.split('');
  current = [...template];

  for (let i = 1; i <= steps; i++) { takeStep(); }
  const localExtrema = extrema();
  return localExtrema.max - localExtrema.min;
};

export default {
  loadTest: () => loadData(testData, 10),
  loadData: () => loadData(data, 10),
  loadBigData: () => loadData(data, 40),
};
