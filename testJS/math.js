let test1 = Math.max(1, 3, 2);
let test2 = Math.min(-1, -3, -2);

let arr1 = [1, 3, 2];

console.log(test1);
console.log(test2);
console.log(Math.max(arr1));

function minMax(min, n, max) {
  const minAns = Math.min(n, max);
  const answer = Math.max(min, minAns);
  return answer;
}

minMax(10, 29, 50);
console.log(minMax(10, 29, 50));
