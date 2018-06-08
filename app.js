"use strict";
/** FUNCTIONAL PROGRAMMING CONCEPTS
 *  1. AVOID SIDE EFFECTS
 *  2. AVOID MUTATIONS
 *  3. AVOID SHARED STATE
 *  4. USE PURE FUNCTION
 *  5. USE FUNCTION COMPOSITON
 *  6. USE DECLARATIVE CODE INSTEAD OF IMPERATIVE CODE
 */

/** SIDE EFFECTS ex.
 * ex. code have has side effects from outside function scope
 * if value of cnt change out put from increment will cange
 */
// let cnt = 0;
// let increment = function() {
//   cnt++;
//   return cnt;
// };

/** AVOID SIDE EFFECTS -------------------------------
 * PURE FUNCTIONS
 *    - The function depends on the input provided and not on external data that changes.
 *    - The funciton doesn't cause side effects. It doesn't cause change beyond its scope.
 *    - Given the same input, the function will always return the same out put
 */

/** FN ex.2 -Pure Functions, -Avoid side effects
 */
let increment = function(num) {
  return num + 1;
};
increment(3);

/** FN ex.1 -Pure Functions, -Avoid side effects
 * variable chage value
 * but that variable defiend inside scope
 * and give the same input the function will always
 * return the same output
 */
let average = function(scores) {
  var total = 0;
  for (let i = 0; i < scores.length; i++) {
    total += scores[i];
  }
  return total / scores.length;
};
average([40, 30, 20, 50, 79]);

/** FN ex.3 -Pure Functions, -Avoid side effects
 * have vareable outside scope
 * but that value is constant(cann't change)
 */
const val = 5;
let mutBy5 = function(number) {
  return number * val;
};

/** AVOIDING SHARED STATE ----------------------------
 * What is state
 *  - A JS program stores data in variables and object.
 *    The constents of these storage locations at any given moment
 *    while the program is running is considered its state
 * What is shared state
 *  - shared state is any variable object, or memory sace that
 *    exists in a shared scope or as the property of an object
 *    being passed between scopes.
 *    A shared scope can include global scope or closore scops.
 */

/** AVOIDING MUTATIONS -------------------------------
 *  MUTATIONS are chaging value of variable or object
 *  IMMUTATIONS are variable or object cann't change value
 */
const arr = [8, 2, 9, 7, 5];
Object.freeze(arr);

const cloneObj = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

const newNums = cloneObj(arr).sort();

console.log("arr sort: ", newNums);
console.log("original arr: ", arr);
const numbers = [10, 20, 30, 40];
const result = numbers.reduce((sum, number) => sum + number, 0);
console.log(result); // 100

/** COMPOSITON
 * - compose invoked function bottom to top
 * - pipe invoked function top to bottom
 */

let str = "Innovation distringuishes between a leader and a folowwer.";

/** Procedures */
/*let prepareString = function() {
  let arr = str
    .trim()
    .replace(/[?.,!]/g, "")
    .toUpperCase()
    .split(" ");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "A" || arr[i] == "AN" || arr[i] === "THE") {
      arr.splice(i, 1);
    }
  }

  return arr;
};

console.log(prepareString(str)); */

/** FUNCTION IN FUNCTIONAL PROGRAMMING */
const trim = str => str.replace(/^\s*|\s*$/g, "");
const noPunct = str => str.replace(/[?.,!]/g, "");
const capitalize = str => str.toUpperCase();
const breakout = str => str.split(" ");
const noArticles = str => str !== "A" && str !== "AN" && str !== "THE";
const filterArticles = arr => arr.filter(noArticles);

//console.log(filterArticles(breakout(capitalize(noPunct(trim(str))))));

/** compse */
const compose = function(...fns) {
  return function(x) {
    return fns.reduceRight(function(v, f) {
      return f(v);
    }, x);
  };
};

/** compose invoking from bottom to top */
const prepareString = compose(
  filterArticles,
  breakout,
  capitalize,
  noPunct,
  trim
);

/** pipe
 * 1. change reduceRight to reduce
 * 2. invoked function from top to bottom
 */
const pipe = function(...fns) {
  return function(x) {
    return fns.reduce(function(v, f) {
      return f(v);
    }, x);
  };
};

/** pipe invoking from top to bottom */
// const prepareString = pipe(
//   trim,
//   noPunct,
//   capitalize,
//   breakout,
//   filterArticles
// );

console.log(prepareString(str));
