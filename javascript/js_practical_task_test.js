const task = require('./js_practical_task.js');

// secondsToDate
// console.log(task.secondsToDate(0));
// console.log(task.secondsToDate(86400));
// console.log(task.secondsToDate(31536000));

// toBase2Converter
// let decimal = 5;
// let decimal = 10;
// let decimal = 1024;
// console.log(task.toBase2Converter(decimal));
// console.log(decimal.toString(2));

// substringOccurrencesCounter
// console.log(task.substringOccurrencesCounter("a", "test it"));
// console.log(task.substringOccurrencesCounter("t", "test it"));
// console.log(task.substringOccurrencesCounter("T", "test it"));

// repeatingLitters
// console.log(task.repeatingLitters("Hello"));
// console.log(task.repeatingLitters("Hello world"));

// redundant
// const f1 = task.redundant("apple");
// console.log(f1());
// const f2 = task.redundant("pear");
// console.log(f2());
// const f3 = task.redundant("");
// console.log(f3());

// towerHanoi
// const disks = 3;
// const disks = 4;
// console.log(task.towerHanoi(disks));
// console.log(2**disks - 1);

// matrixMultiplication
//
// math.js
// math.multiply(4, 5.2)        // returns number 20.8
// math.multiply(2, 3, 4)       // returns number 24
//
// const a = math.complex(2, 3)
// const b = math.complex(4, 1)
// math.multiply(a, b)          // returns Complex 5 + 14i
//
// const c = [[1, 2], [4, 3]]
// const d = [[1, 2, 3], [3, -4, 7]]
// math.multiply(c, d)          // returns Array [[7, -6, 17], [13, -4, 33]]
//
// const e = math.unit('2.1 km')
// math.multiply(3, e)          // returns Unit 6.3 km
//
// https://ru.onlinemschool.com/math/assistance/matrix/multiply/
//
// let matrix1 = [
//     [ 1, 2 ],
//     [ 3, 4 ]
// ];
// let matrix2 = [
//     [ 4, 3 ],
//     [ 2, 1 ]
// ];
//
// let matrix1 = [
//     [ 1, 2, 3 ],
//     [ 4, 5, 6 ],
//     [ 7, 8, 9 ]
// ];
// let matrix2 = [
//     [ 10, 11, 12 ],
//     [ 13, 14, 15 ],
//     [ 16, 17, 18 ]
// ];
// console.log(task.matrixMultiplication(matrix1, matrix2));

// gather
console.log(task.gather('e')('l')('o')('l')('!')('h').order(5)(0)(1)(3)(2)(4).get());
console.log(task.gather("a")("b")("c").order(0)(1)(2).get());
console.log(task.gather("a")("b")("c").order(2)(1)(0).get());
