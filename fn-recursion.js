/* ES5
const factorial = function(num) {
  if (num == 1) {
    return 1;
  }

  return num * factorial(num - 1);
};*/

/**  invoked 9 times
 *   5 * factorial(4)
 *   5 * 4 * factorial(3)
 *   5 * 4 * 3 factorial(2)
 *   5 * 4 * 3 * 2 * factorial(1)
 *   5 * 4 * 3 * 2 * 1
 *   5 * 4 * 3 * 2
 *   5 * 4 * 6
 *   5 * 24
 *   120
 */

// ES6
const factorial = num => (num === 1 ? 1 : num * factorial(num - 1));

/*const factorial2 = function(x) {
  if (x > 0) {
    return x * factorial2(x - 1);
  } else {
    return 1;
  }
};*/

/** from babe coder invoked 10 times
 *   5 * factorial(4)
 *   5 * 4 * factorial(3)
 *   5 * 4 * 3 factorial(2)
 *   5 * 4 * 3 * 2 * factorial(1)
 *   5 * 4 * 3 * 2 * 1 * factorial(0)
 *   5 * 4 * 3 * 2 * 1
 *   5 * 4 * 3 * 2
 *   5 * 4 * 6
 *   5 * 24
 *   120
 */

// from babel coder
const factorial2 = x => (x > 0 ? x * factorial2(x - 1) : 1);

let result = factorial(5);
let result2 = factorial2(5);
console.log(result);
console.log(result2);
