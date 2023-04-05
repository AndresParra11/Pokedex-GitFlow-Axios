// Creamos un array donde se generan 5 números aleatorios del 1 al 1000
let idPokemones = [];

for (let i = 0; i < 5; i++) {
  idPokemones.push(Math.floor(Math.random() * 1000) + 1);
}

// Creamos la función asincrónica para utilizar el verbo GET y mediante la librería AXIOS

const getAllPokemonByUrl = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const pokemones = [];
for (let i = 0; i < 5; i++) {
  pokemones.push(
    await getAllPokemonByUrl(
      `https://pokeapi.co/api/v2/pokemon/${idPokemones[i]}`
    )
  );
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const pokemonPpal =
  JSON.parse(sessionStorage.getItem("pokemonPpal")) || pokemones[0];
const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imageTagPokemonPpal = document.querySelector(".pokemon__imagen");
const imageElementPokemonPpal = document.querySelector(".pokemon__elemento");

const printInfoPokemonPpal = (name, img, img2, pokemon) => {
  name.innerHTML = `${capitalizeFirstLetter(pokemon.name)}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${capitalizeFirstLetter(pokemon.name)}`;
  // Elemento
  img2.src = `${pokemon.sprites.front_default}`;
  img2.alt = `${capitalizeFirstLetter(pokemon.name)}`;

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
};

printInfoPokemonPpal(
  namePokemonPpal,
  imageTagPokemonPpal,
  imageElementPokemonPpal,
  pokemonPpal
);

const pokemonesSecundaries = pokemones.filter(
  (pokemon) => pokemon.id !== pokemonPpal.id
); //buscamos el pokemon en el arreglo de pokemones

const printImagePokemonesSec = (pokemonesFooter) => {
  for (let i = 0; i < 4; i++) {
    const imagePokemonesSecundaries = document.querySelector(`#pok${i + 1}`);
    imagePokemonesSecundaries.src = pokemonesFooter[i].sprites.front_default;
    imagePokemonesSecundaries.setAttribute("data-id", pokemonesFooter[i].id);
  }
};
printImagePokemonesSec(pokemonesSecundaries);

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
  //PokemonSec es igual a los pokemones secundarios que van a parecer en el footer
  const typePokemon = event.target.getAttribute("name");
  if (typePokemon === "pokemonSec") {
    const idPokemonSecundary = parseInt(event.target.getAttribute("data-id")); //obtenemos el id del pokemon secundario seleccionado
    const selectedPokemon = pokemones.find((pokemon) => pokemon.id === idPokemonSecundary); //buscamos el pokemon en el arreglo de pokemones

    sessionStorage.setItem("pokemonPpal", JSON.stringify(selectedPokemon));
    window.location.href = "./index.html";
  }
});
