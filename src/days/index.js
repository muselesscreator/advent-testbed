const days = [];

const loadDay = (day) => {
  days.push({ name: day, functions: require(`./${day}`).default });
};

[
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
].map(loadDay);

export default days;
