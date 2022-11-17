'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
function secondsToDate(seconds) {
    const defaultDate = Date.parse('2020-06-01');
    let date = new Date(seconds*1000 + defaultDate).toISOString();
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);
    return day + "." + month + "." + year;
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
function toBase2Converter(decimal) {
    if (decimal >= 1024) {
        throw new Error("\'decimal\' must be less than 1024");
    }

    let getResult = function toBase2ConverterRecursive(result, decimal) {
        let remainder = decimal % 2;
        decimal = Math.trunc(decimal / 2);

        result = remainder + result;

        if (decimal == 0 || decimal == 1) {
            return decimal + result;
        } else {
            return toBase2ConverterRecursive(result, decimal);
        }
    };

    return getResult("", decimal);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
function substringOccurrencesCounter(substring, text) {
    return text.toLowerCase().split(substring.toLowerCase()).length - 1;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    for (let character of Array.from(string)) {
        if (string.split(character).length == 2) {
            string = string.replace(character, character.repeat(2));
        }
    }
    return string;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
function redundant(str) {
    return () => {
        return str;
    }
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    let steps = 0;
    let countSteps = function towerOfHanoi(n, fromRod, toRod, auxRod) {
        if (n == 0) return;
        towerOfHanoi(n - 1, fromRod, auxRod, toRod);
        console.log("Move disk " + n + " from rod " + fromRod + " to rod " + toRod);
        ++steps;
        towerOfHanoi(n - 1, auxRod, toRod, fromRod);
    }
    countSteps(disks, 'A', 'B', 'C');
    return steps;
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
    let squareMatrixValidation = (matrix) => {
        let size = matrix.length;
        for (let array of matrix) {
            if (array.length != size) {
                throw new Error("Invalid square matrix format");
            }
        }
        return size;
    }

    let size = squareMatrixValidation(matrix1);

    if (size != squareMatrixValidation(matrix2)) {
        throw new Error("These matrices can't be multiplied");
    }

    let result = Array.from(Array(size), () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
function gather(str) {
    const arr = [];
    
    function doString(str1 = str) {
        doString.order = function (order) {
            const orderArr = [];
            
            function doOrder(order1 = order) {
                orderArr.push(order1);
                doOrder.get = function () {
                    const string = orderArr.map(order => arr[order]).join('');
                    return string;
                }

                return doOrder;
            }

            return doOrder();
        }

        arr.push(str1);
        return doString;
    }

    return doString();
}

module.exports = {
    secondsToDate,
    toBase2Converter,
    substringOccurrencesCounter,
    repeatingLitters,
    redundant,
    towerHanoi,
    matrixMultiplication,
    gather
};
