/**
 * Returns a random integer between [min, max[.
 *
 * @param {Number} min Min.
 * @param {Number} max Max.
 * @returns a random integer between [min, max[.
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Durstenfeld shuffle algorithm.
 *
 * @param {any[]} array Array.
 * @returns the shuffled array.
 */
export function durstenfeldShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
