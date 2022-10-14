import axios from 'axios';

/**
 * Fetch a random animal from the zoo animal api.
 *
 * @returns a random animal.
 */
async function fetchAnimal() {
  try {
    const url = 'https://zoo-animal-api.herokuapp.com/animals/rand';
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Fetch "qty" animals from the zoo animal api.
 *
 * @param {Number} qty Quantity.
 * @returns an animals.
 */
export async function fetchAnimals(qty) {
  const animals = [];

  for (let i = 0; i < qty; i++) {
    const animal = (await fetchAnimal()).data;

    animals.push({
      /** @type {String} */
      name: animal.name.replace(' ', '-').toLowerCase(),

      /** @type {String} */
      src: animal.image_link,

      /** @type {Boolean} */
      matched: false,
    });
  }

  return animals;
}
