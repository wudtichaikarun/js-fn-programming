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
console.log("object user3 create by fn-programming: ", user3);
console.groupEnd();
