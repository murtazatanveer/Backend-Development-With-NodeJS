const { log } = require("console");

const stu = {
  name: "murtaza",
  age: 23,
  address: "jhelum",
};

const json = JSON.stringify(stu);

console.log(json);

console.log(JSON.parse(json), typeof JSON.parse(json));

const evenNums = [2, 4, 6, 8, 10, 12];

console.log(JSON.stringify(evenNums));
