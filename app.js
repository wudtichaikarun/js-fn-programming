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

/**
 * OOP CODE
 */
// constructor function
function UserRecord(id) {
  if (this instanceof UserRecord) {
    this.userId = id;
    this.questions = [];
  } else {
    return new UserRecord(id);
  }
}

// prototype propertes and method
let userProto = {
  addQuestion: function(qID, response, result, weight) {
    this.questions.push({
      qID: qID,
      response: response,
      result: result,
      weight: weight
    });
  },
  get myScore() {
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {
      let quest = this.questions[i];
      if (quest.result) {
        score += quest.weight;
      }
    }
    return score;
  },
  get possScore() {
    let possible = 0;
    for (let i = 0; i < this.questions.length; i++) {
      possible += this.questions[i].weight;
    }
    return possible;
  }
};

UserRecord.prototype = userProto;
UserRecord.prototype.constructor = UserRecord;

const user1 = new UserRecord(1);
const user2 = new UserRecord(2);

user1.addQuestion("q1", "answer", true, 1);
user1.addQuestion("q2", "wrong answer", false, 2);

user2.addQuestion("q1", "answer", true, 1);
user2.addQuestion("q2", "right answer", true, 2);

co nsole.log("user1 got " + user1.myScore + " out of " + user1.possScore);
console.log("user2 got " + user2.myScore + " out of " + user2.possScore);

/** Functional code
 */
const clone = o => JSON.parse(JSON.stringify(o));

const createUser = function(id) {
  return {
    userId: id,
    questions: []
  };
};

const addQuestion = function(user, qID, response, result, weight) {
  /*const newUser = clone(user);
    newUser.questions.push({
        qID: qID,
        response: response,
        result: result,
        weight: weight
    });
    return newUser;*/
  const questions = clone(user.questions);
  const newQuestion = {
    qID: qID,
    response: response,
    result: result,
    weight: weight
  };
  return {
    userId: user.userId,
    questions: [...questions, newQuestion]
  };
};

const calcScore = function(user) {
  return user.questions.reduce(
    (tot, quest) => tot + (quest.result ? quest.weight : 0),
    0
  );
};

const calcPossible = function(user) {
  return user.questions.reduce((tot, quest) => tot + quest.weight, 0);
};

//WE declare a new variable each time so we don't mutate. However, for ease this strict pattern may not make sense to follow always.
const user3 = createUser(1);
const user4 = createUser(2);

const user3a = addQuestion(user3, "q1", "answer", true, 1);
const user3b = addQuestion(user3a, "q2", "wrong answer", false, 2);

const user4a = addQuestion(user4, "q1", "answer", true, 1);
const user4b = addQuestion(user4a, "q2", "right answer", true, 2);

console.group("functional programming");
console.log(
  "user3 got " + calcScore(user3b) + " out of " + calcPossible(user3b)
);
console.log(
  "user4 got " + calcScore(user4b) + " out of " + calcPossible(user4b)
);
console.groupEnd();
