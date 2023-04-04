// Creamos un array donde se generan 5 números aleatorios del 1 al 1000
let idPokemones = [];

for (let i = 0; i < 5; i++) {
  idPokemones.push(Math.floor(Math.random() * 1000) + 1);
}

// Creamos la función asincrónica para utilizar el verbo GET y mediante la librería AXIOS

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

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonPpal =
  JSON.parse(sessionStorage.getItem("pokemonPpal")) || pokemones[0];
const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imagenPokemonPpal = document.querySelector(".pokemon__imagen");
const elementoPokemonPpal = document.querySelector(".pokemon__elemento");

const printPokemonPpal = (name, img, img2, pokemon) => {
  name.innerHTML = `${capitalizarPrimeraLetra(pokemon.name)}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${capitalizarPrimeraLetra(pokemon.name)}`;
  // Elemento
  img2.src = `${pokemon.sprites.front_default}`;
  img2.alt = `${capitalizarPrimeraLetra(pokemon.name)}`;

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
};

printPokemonPpal(
  namePokemonPpal,
  imagenPokemonPpal,
  elementoPokemonPpal,
  pokemonPpal
);

const pokemonesSecundarios = pokemones.filter(
  (pokemon) => pokemon.id !== pokemonPpal.id
); //buscamos el pokemon en el arreglo de pokemones

const printPokemonSec = (pokemonesFooter) => {
  for (let i = 0; i < 4; i++) {
    const imagenPokemonesSecundarios = document.querySelector(`#pok${i + 1}`);
    imagenPokemonesSecundarios.src = pokemonesFooter[i].sprites.front_default;
    imagenPokemonesSecundarios.setAttribute("data-id", pokemonesFooter[i].id);
  }
};
printPokemonSec(pokemonesSecundarios);

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

//Crearemos la funcionalidad de los botones que va a permitir, mostrar información y imagen de pokemones secundarios seleccionados//
//Capturar click de pokemones//
document.addEventListener("click", (event) => {
  const pokemonSecundario = event.target.getAttribute("name");
  if (pokemonSecundario === "pokemonSec") {
    const id = parseInt(event.target.getAttribute("data-id")); //obtenemos el id del pokemon secundario seleccionado
    const pokemonSeleccionado = pokemones.find((pokemon) => pokemon.id === id); //buscamos el pokemon en el arreglo de pokemones

    sessionStorage.setItem("pokemonPpal", JSON.stringify(pokemonSeleccionado));
    window.location.href = "./index.html";
  }
});
