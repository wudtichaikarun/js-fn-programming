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
  console.group("reduce, map, filter");
  let arr = [1, 3, 4, 5, 3];
  // (initial, elem, index) => {}
  let total = arr.reduce((sum, number) => sum + number, 0);
  console.log(total);

  // ** = ยกกำลังสอง
  // (val, index, array) => {}
  let newArray = arr.map(val => val ** 2);
  console.log(newArray);

  let filterArray = arr.filter(val => val > 3);
  console.log(filterArray);
  console.groupEnd();
})();
