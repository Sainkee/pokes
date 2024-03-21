let filterType = document.querySelector("#filterType");
let resetBtn = document.querySelector(".reset");
let searchBtn = document.querySelector(".search");
let card_container = document.querySelector(".card_container");
let input = document.querySelector("input");

const pokemonTypeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

Object.keys(pokemonTypeColors).forEach((type) => {
  let option = document.createElement("option");
  option.value = type.toLowerCase();
  option.innerText = type;
  filterType.appendChild(option);
});

// onload fetch all

async function getData(params, limit = 250) {
  // let url = "https://pokeapi.co/api/v2/pokemon/";
  let url2 = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  try {
    const response = await fetch(url2);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    var data = await response.json();
    if (params) {
      var filterd = data.results.filter((pokes) => {
        return pokes.name.includes(params.toLowerCase());
      });
    }

    console.log(data);
    card_container.innerHTML = "";
    data.results.forEach((pok) => {
      console.log(pok.url);
      let url = pok.url;

      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          // card me show karwana

          card_container.innerHTML += `
          
          <div  class="card tracking-wide ${
            data.types[0].type.name
          } shadow-lg rounded-lg overflow-hidden text-white w-64 border-2 p-4 relative">
        <div class="flex justify-between">
          <span>#0${data.id}</span>
          <span
            class="${
              data.types[0].type.name + data.types[0].type.name.slice(-1)
            } h-[1rem] w-[2em] shadow-emerald-400 rounded-sm"
          >
          </span>
        </div>
        <div class="flex justify-center">
          <section class="stage">
            <figure class="ball bubble"></figure>
          </section>
        </div>
        <div>
          <img
            src="${data.sprites.other.dream_world.front_default}"
            alt=""
            class="w-[120px] h-[100px] absolute top-[80px] left-16 mx-auto"
          />
        </div>

        <div class="p-4 text-center">
          <h2 class="font-bold text-xl  tracking-wider my-3">${
            data.name.slice(0, 1).toUpperCase() + data.name.slice(1)
          }</h2>
          <div class="flex justify-around items-center">
            <div>
              <p class="text-[#ccc] text-xs">Weight</p>
              <p>${data.weight}</p>
            </div>
            <div>
              <p class="text-[#ccc] text-xs">height</p>
              <p>${data.height}</p>
            </div>
          </div>
          <p class="text-[#ccc] my-4">
            Type: <span class="type text-[white] font-semibold">${
              data.types[0].type.name
            }/${data.types[1].type.name}</span>
          </p>
        </div>
      </div> 
          
          `;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = getData();

searchBtn.addEventListener("click", () => {
  let val = input.value;
  getData(val.trim());
});

resetBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
