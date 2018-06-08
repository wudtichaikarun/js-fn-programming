/**
 * reduce and reduceRight:
 *    combines the elements of an array using the function you specify.
 * map:
 *    passes each element of the array to the function you provided
 *    and returns a new array that consists of the values returned by that functon.
 * filter:
 *    returns a new array that is a subset of the existing array.
 */
(function() {
  let arr = [1, 3, 4, 5, 3];
  let total = arr.reduce((sum, number) => sum + number, 0);
  console.log(total);
})();
