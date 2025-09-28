const arr = [];
const set = new Set([]);

function permutes(n) {
  let numberOfPermutes = 1;
  for (let i = n; i > 0; i--) {
    numberOfPermutes *= i;
  }
  return numberOfPermutes;
}

function permuteArr(str) {
  let copyArr = str.split("");
  if (set.size > permutes(copyArr.length) - 1) {
    return set;
  }
  for (i = copyArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }
  set.add(copyArr.join(""));
  return permuteArr(str);
}

console.log(permuteArr("cat"));

for (const perm of set) {
  arr.push(perm);
}
console.log(arr);
