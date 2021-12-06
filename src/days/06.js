/* eslint-disable max-classes-per-file */
const testData = '3,4,3,1,2';
const data = '4,3,4,5,2,1,1,5,5,3,3,1,5,1,4,2,2,3,1,5,1,4,1,2,3,4,1,4,1,5,2,1,1,3,3,5,1,1,1,1,4,5,1,2,1,2,1,1,1,5,3,3,1,1,1,1,2,4,2,1,2,3,2,5,3,5,3,1,5,4,5,4,4,4,1,1,2,1,3,1,1,4,2,1,2,1,2,5,4,2,4,2,2,4,2,2,5,1,2,1,2,1,4,4,4,3,2,1,2,4,3,5,1,1,3,4,2,3,3,5,3,1,4,1,1,1,1,2,3,2,1,1,5,5,1,5,2,1,4,4,4,3,2,2,1,2,1,5,1,4,4,1,1,4,1,4,2,4,3,1,4,1,4,2,1,5,1,1,1,3,2,4,1,1,4,1,4,3,1,5,3,3,3,4,1,1,3,1,3,4,1,4,5,1,4,1,2,2,1,3,3,5,3,2,5,1,1,5,1,5,1,4,4,3,1,5,5,2,2,4,1,1,2,1,2,1,4,3,5,5,2,3,4,1,4,2,4,4,1,4,1,1,4,2,4,1,2,1,1,1,1,1,1,3,1,3,3,1,1,1,1,3,2,3,5,4,2,4,3,1,5,3,1,1,1,2,1,4,4,5,1,5,1,1,1,2,2,4,1,4,5,2,4,5,2,2,2,5,4,4';

class LanternSchool {
  BIRTH_COUNTER = 8;

  RESET_COUNTER = 6;

  constructor(dataString) {
    this.initialCounters = dataString.split(',').map(Number);
    this.counters = [...this.initialCounters];
    this.counterBuckets = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(val => this.initialCounters.filter(v => v === val).length);
  }

  get schoolSize() {
    return this.counterBuckets.reduce((total, v) => total + v, 0);
  }

  newDay() {
    const readyToPop = this.counterBuckets.shift();
    this.counterBuckets.push(readyToPop);
    this.counterBuckets[6] += readyToPop;
  }
}

const loadSchool = (str) => {
  const school = new LanternSchool(str);
  for (let days = 0; days < 256; days++) {
    school.newDay();
  }
  return school.schoolSize;
};

export default {
  loadTestSchool: () => loadSchool(testData),
  loadSchool: () => loadSchool(data),
};
