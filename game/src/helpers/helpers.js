export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const frontofficeUrl = 'https://site212245.tw.cs.unibo.it' + '/frontoffice/';
export const baseUrl = import.meta.env.VITE_API_BASE_URL;
