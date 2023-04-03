let idPokemones = [];

for (let i = 0; i < 5; i++) {
  idPokemones.push(Math.floor(Math.random() * 1000) + 1);
}

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

console.log(pokemones);

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonPpal = pokemones[0];
console.log(pokemonPpal);

console.log(idPokemones);

const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imagenPokemonPpal = document.querySelector(".pokemon__imagen");
const elementoPokemonPpal = document.querySelector(".pokemon__elemento");

const printPokemonPpal = (name, img, img2) => {
  name.innerHTML = `${capitalizarPrimeraLetra(pokemonPpal.name)}`;
  img.src = `${pokemonPpal.sprites.front_default}`;
  img.alt = `${capitalizarPrimeraLetra(pokemonPpal.name)}`;
  // Elemento
  img2.src = `${pokemonPpal.sprites.front_default}`;
  img2.alt = `${capitalizarPrimeraLetra(pokemonPpal.name)}`;
};

printPokemonPpal(namePokemonPpal, imagenPokemonPpal, elementoPokemonPpal);

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
