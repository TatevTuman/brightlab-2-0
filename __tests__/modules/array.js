export const headers = (array) =>
  array.slice(1).map((xs) =>
    xs.reduce((acc, x, i) => {
      acc[array[0][i]] = x;
      return acc;
    }, {}),
  );

export const max = (array) => Math.max(...array);

export const min = (array) => Math.min(...array);

export const sum = (array) => array.reduce((a, b) => a + b, 0);

export const mean = (array) => sum(array) / array.length;

export const unique = (array) =>
  array.filter((value, index, self) => self.indexOf(value) === index);
