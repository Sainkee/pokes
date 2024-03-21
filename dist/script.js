let filterType = document.querySelector("#filterType");
let resetBtn = document.querySelector(".reset");
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
let arr = [];

function creatOption(params) {
  Object.keys(pokemonTypeColors).forEach((type) => {
    let option = document.createElement("option");
    option.value = type.toLowerCase();
    option.innerText = type;
    filterType.appendChild(option);
  });
}

// onload fetch all

async function getData(limit = 25) {
  let url2 = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  try {
    const response = await fetch(url2);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    card_container.innerHTML = "";
    data.results.forEach((pok) => {
      // console.log(pok.url);
      let url = pok.url;

      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          displayData(data);
          arr.push(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = () => {
  getData();
  creatOption();
};

resetBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function displayData(data) {
  let types = "";
  for (let index = 0; index < data.types.length; index++) {
    types += data.types[index].type.name;
    if (index !== data.types.length - 1) {
      types += "/";
    }
  }

  card_container.innerHTML += `
          
    <div  class="card text-[#ccc] tracking-wide group transform-gpu hover:ease-in-out ${
      data.types[0].type.name
    } shadow-lg rounded-lg overflow-hidden  w-64 border-2 p-4 relative">
  <div class="flex justify-between shadow-emerald-50 ">
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
      class="w-[150px] h-[120px] absolute top-[80px] left-14 mx-auto group transform-gpu cursor-pointer hover:animate-bounce"
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
        <p class="text-[#ccc] text-xs">Height</p>
        <p>${data.height}</p>
      </div>
    </div>
    <p class="text-[#ccc] my-4">
      Type: <span class="type text-[white] font-semibold">${types}</span>
    </p>
  </div>
</div> 
    
    `;
}

filterType.addEventListener("change", () => {
  filterData(filterType.value);
});

input.addEventListener("input", (e) => {
  filterData(e.target.value.toLowerCase());
});

function filterData(param) {
  let filtered = arr.filter((data) => {
    let types = "";
    for (let index = 0; index < data.types.length; index++) {
      types += data.types[index].type.name;
      if (index !== data.types.length - 1) {
        types += " ";
      }
    }
    return (
      types.includes(param) ||
      data.name.toLowerCase().startsWith(param) ||
      data.id === Number(param) ||
      data.weight === Number(param) ||
      data.height === Number(param)
    );
  });

  card_container.innerHTML = "";

  filtered.forEach((pok) => {
    displayData(pok);
  });
}
