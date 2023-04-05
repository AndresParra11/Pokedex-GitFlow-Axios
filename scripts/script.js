// Creamos un array donde se generan 5 números aleatorios del 1 al 1000
let idPokemones = [];

for (let i = 0; i < 5; i++) {
  idPokemones.push(Math.floor(Math.random() * 1000) + 1);
}

// Creamos la función asincrónica para utilizar el verbo GET y mediante la librería AXIOS obtenemos la información de los pokemones asociados a los ID generados aleatoriamente.

const getAllPokemonById = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const pokemones = [];
for (let i = 0; i < 5; i++) {
  pokemones.push(
    await getAllPokemonById(
      `https://pokeapi.co/api/v2/pokemon/${idPokemones[i]}`
    )
  );
}

// Función para poner la primera letra en mayúscula.
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Creamos una función para pintar las imágenes y la información asociada al pokemón principal mostrado en pantalla.
const pokemonPpal = pokemones[0];
const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imagenPokemonPpal = document.querySelector(".pokemon__imagen");
const elementoPokemonPpal = document.querySelector(".pokemon__elemento");

const printPokemonPpal = (name, img, img2, pokemon) => {
  name.innerHTML = `${capitalizarPrimeraLetra(pokemon.name)}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${capitalizarPrimeraLetra(pokemon.name)}`;
  // Elemento
  img2.src = `${pokemonPpal.sprites.front_default}`;
  img2.alt = `${capitalizarPrimeraLetra(pokemon.name)}`;
};

printPokemonPpal(
  namePokemonPpal,
  imagenPokemonPpal,
  elementoPokemonPpal,
  pokemonPpal
);

const stats = [
  pokemonPpal.id,
  pokemonPpal.types[0].type.name,
  pokemonPpal.height,
  pokemonPpal.stats[1].base_stat,
  pokemonPpal.abilities[0].ability.name,
  pokemonPpal.weight,
];

for (let i = 1; i <= 6; i++) {
  const stat = document.querySelector(`#stat${i}`);
  stat.innerHTML = stats[i - 1];
}

for (let i = 1; i <= 4; i++) {
  const imagenPokemonesSecundarios = document.querySelector(`#pok${i}`);
  imagenPokemonesSecundarios.src = pokemones[i].sprites.front_default;
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

