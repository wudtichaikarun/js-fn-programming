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

let result = factorial(10);
let result2 = factorial2(10);
console.log(result);
console.log(result2);

/** recursion!!!  is pretty bad code
 * because execution contenxt creat
 * every time when functon is invoked
 * you probery has problem out of memory
 *
 * USE TAIL CALL OPTIMIZATION INSTEAND OF RECURSION
 *    5! = 5 * 4 * 3 * 2 * 1
 *    5! = 5 * 4!
 *    5! = 20 * 3!
 *    5! = 60 * 2!
 *    5! = 120 * 1!
 */

const tailCallFactorial = (n, p = 1) => {
  if (n <= 1) return p;
  else return tailCallFactorial(n - 1, n * p);
};

const sortTailCallFactorial = (n, p = 1) =>
  n <= 1 ? p : sortTailCallFactorial(n - 1, n * p);
/**
 * n = 5, p = 1, n * p = 5;
 * n = 4, p = 5, n * p = 20;
 * n = 3, p = 20, n * p = 60;
 * n = 2, p = 60, n * p = 120;
 * n = 1, return p
 * ans 120
 */
console.log(tailCallFactorial(5));
console.log(sortTailCallFactorial(5));
