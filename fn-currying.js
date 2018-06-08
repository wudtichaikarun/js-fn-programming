(function() {
  /** FUNCTION CURRY
   * This is problem don't nedd to type Karun all the time
   *   karunFamily("Romantic", "Karun");
   *   karunFamily("Funny", "Karun");
   *   karunFamily("Haha", "Karun");
   */

  const curryLastName = function(lastname) {
    return function(firstname) {
      console.log(`${firstname}  ${lastname}`);
    };
  };

  const karunFamily = curryLastName("Karun");
  console.group("function currying");
  karunFamily("Romantic");
  karunFamily("Funny");
  karunFamily("Haha");
  console.groupEnd();
})();
