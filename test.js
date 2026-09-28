function getPINs(observed) {
  const adjacent = {
    '0': ['0', '8'],
    '1': ['1', '2', '4'],
    '2': ['1', '2', '3', '5'],
    '3': ['2', '3', '6'],
    '4': ['1', '4', '5', '7'],
    '5': ['2', '4', '5', '6', '8'],
    '6': ['3', '5', '6', '9'],
    '7': ['4', '7', '8'],
    '8': ['5', '7', '8', '9', '0'],
    '9': ['6', '8', '9']
  };

  let result = [''];

  for (const digit of observed) {
    const next = [];

    for (const prefix of result) {
      for (const option of adjacent[digit]) {
        next.push(prefix + option);
      }
    }

    result = next;
  }

  return result;
}

// Examples
console.log(getPINs("8"));
// ["5","7","8","9","0"]

console.log(getPINs("11"));
// ["11","12","14","21","22","24","41","42","44"]