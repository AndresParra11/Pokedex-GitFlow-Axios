// Creamos un array donde se generan 5 números aleatorios del 1 al 1000
let idPokemones = [];

for (let i = 0; i < 5; i++) {
  idPokemones.push(Math.floor(Math.random() * 1000) + 1);
}

// Creamos la función asincrónica para utilizar el verbo GET y mediante la librería AXIOS obtenemos la información de los pokemones asociados a los ID generados aleatoriamente.

const getAllPokemonByUrl = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

// Consumimos la función getAllPokemonByUrl, modificando la URL con el ID de cada pokemón y la almacenamos en un array de pokemones.
const pokemones = [];
for (let i = 0; i < 5; i++) {
  pokemones.push(
    await getAllPokemonByUrl(
      `https://pokeapi.co/api/v2/pokemon/${idPokemones[i]}`
    )
  );
}

// Creamos una función para poner la primera letra en mayúscula.
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Creamos una función para pintar las imágenes y la información asociada al pokemón principal mostrado en pantalla.
const pokemonPpal = pokemones[0];
const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imagenTagPokemonPpal = document.querySelector(".pokemon__imagen");
const imageElementTagPokemonPpal = document.querySelector(".pokemon__elemento");

const printInfoPokemonPpal = (name, img, img2, pokemon) => {
  name.innerHTML = `${capitalizeFirstLetter(pokemon.name)}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${capitalizeFirstLetter(pokemon.name)}`;
  // Element
  img2.src = `${pokemonPpal.sprites.front_default}`;
  img2.alt = `${capitalizeFirstLetter(pokemon.name)}`;
};

printInfoPokemonPpal(
  namePokemonPpal,
  imagenTagPokemonPpal,
  imageElementTagPokemonPpal,
  pokemonPpal
);

const statsPokemonPpal = [
  pokemonPpal.id,
  pokemonPpal.types[0].type.name,
  pokemonPpal.height,
  pokemonPpal.stats[1].base_stat,
  pokemonPpal.abilities[0].ability.name,
  pokemonPpal.weight,
];

for (let i = 1; i <= 6; i++) {
  const stat = document.querySelector(`#stat${i}`);
  stat.innerHTML = statsPokemonPpal[i - 1];
}

for (let i = 1; i <= 4; i++) {
  const imagePokemonesSecundaries = document.querySelector(`#pok${i}`);
  imagePokemonesSecundaries.src = pokemones[i].sprites.front_default;
}

/* Información necesaria de la API  

-.name
-.id
-.height
-.weight
-types[0].type.name - Tipo
-.abilities[1].ability.name - Habilidad
-.stats[1].base_stat
-.sprites.front_default
*/
