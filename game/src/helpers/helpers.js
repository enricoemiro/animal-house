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

export const frontofficeUrl = 'http://localhost:8000/frontoffice/';
export const baseUrl = 'http://localhost:8000/';
