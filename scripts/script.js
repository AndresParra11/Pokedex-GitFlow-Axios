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
const pokemonPpal =
  JSON.parse(sessionStorage.getItem("pokemonPpal")) || pokemones[0];
const namePokemonPpal = document.querySelector(".pokemon__nombre");
const imageTagPokemonPpal = document.querySelector(".pokemon__imagen");
const imageElementTagPokemonPpal = document.querySelector(".pokemon__elemento");

const printInfoPokemonPpal = (name, img, img2, pokemon) => {
  name.innerHTML = `${capitalizeFirstLetter(pokemon.name)}`;
  img.src = `${pokemon.sprites.front_default}`;
  img.alt = `${capitalizeFirstLetter(pokemon.name)}`;

  // Element
  img2.src = `${pokemon.sprites.front_default}`;
  img2.alt = `${capitalizeFirstLetter(pokemon.name)}`;

  // Stats del pokemon principal que se va a imprimir en pantalla.
  const statsPokemonPpal = [
    pokemon.id,
    pokemon.types[0].type.name,
    pokemon.height,
    pokemon.stats[1].base_stat,
    pokemon.abilities[0].ability.name,
    pokemon.weight,
  ];

  // Imprimir stats en pantalla.
  for (let i = 1; i <= 6; i++) {
    const stat = document.querySelector(`#stat${i}`);
    stat.innerHTML = statsPokemonPpal[i - 1];
  }
};

// Llamamos a la función para pintar la información del pokemón principal.
printInfoPokemonPpal(
  namePokemonPpal,
  imageTagPokemonPpal,
  imageElementTagPokemonPpal,
  pokemonPpal
);

// Buscamos el pokemon en el arreglo de pokemones
const pokemonesSecundaries = pokemones.filter(
  (pokemon) => pokemon.id !== pokemonPpal.id
);

// Creamos una función para pintar las imágenes de los pokemones secundarios que se muestran en el footer.
const printImagePokemonesSec = (pokemonesFooter) => {
  for (let i = 0; i < 4; i++) {
    const imagePokemonesSecundaries = document.querySelector(`#pok${i + 1}`);
    imagePokemonesSecundaries.src = pokemonesFooter[i].sprites.front_default;
    imagePokemonesSecundaries.setAttribute("data-id", pokemonesFooter[i].id);
  }
};

// Pintamos los pokemones secundarios en el footer.
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
  //PokemonSec es igual a los pokemones secundarios que van a aparecer en el footer
  const typePokemon = event.target.getAttribute("name");
  if (typePokemon === "pokemonSec") {
    const idPokemonSecundary = parseInt(event.target.getAttribute("data-id")); // Obtenemos el id del pokemon secundario seleccionado.
    const selectedPokemon = pokemones.find(
      (pokemon) => pokemon.id === idPokemonSecundary
    ); //buscamos el pokemon en el arreglo de pokemones.

    sessionStorage.setItem("pokemonPpal", JSON.stringify(selectedPokemon));
    window.location.href = "./index.html";
  }
});

//crear busqueda por filtrado de nombre del Pokemon.
const searchPokemonByName = (searchTerm = "") => {
  const pokemonSearch = getAllPokemonByUrl(
    `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
  );
  return pokemonSearch;
};

//Creamos la funcionalidad de la barra de búsqueda de pokemón por el nombre para cada tamaño de pantalla.
const formSearch = document.querySelector(".form");
const formSearch2 = document.querySelector(".form2");

formSearch.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value;
  if (searchTerm) {
    try {
      const searchedPokemon = await searchPokemonByName(searchTerm);

      printInfoPokemonPpal(
        namePokemonPpal,
        imageTagPokemonPpal,
        imageElementTagPokemonPpal,
        searchedPokemon
      );
    } catch (error) {
      Swal.fire("Upss!", "Hubo un error en la busqueda", "error");
    }
  }
});

formSearch2.addEventListener("submit", async (event) => {
  event.preventDefault();
  const inputSearch = formSearch2.children[0];
  const searchTerm = inputSearch.value;
  if (searchTerm) {
    try {
      const searchedPokemon = await searchPokemonByName(searchTerm);

      printInfoPokemonPpal(
        namePokemonPpal,
        imageTagPokemonPpal,
        imageElementTagPokemonPpal,
        searchedPokemon
      );
    } catch (error) {
      Swal.fire("Upss!", "Hubo un error en la busqueda", "error");
    }
  }
});
