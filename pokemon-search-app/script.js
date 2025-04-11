const searchBtn = document.getElementById("search-button");

// Colors found from https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

searchBtn.addEventListener("click", ()=>{
const pokemonInput = document.getElementById("search-input").value;

const pokemon = formatPokemonName(pokemonInput);

//console.log(pokemon);
fetchData(pokemon);


});




const fetchData = async(pokemon) => {
  const retries=3;
  const pokemonApi = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemon}`;
  //console.log(pokemonApi);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(pokemonApi);
      //console.log("Response status:", response.status);
      //console.log("Response headers:", response.headers);
      if(!response.ok){
        //console.log("Response status:", response.status);
      }
      const data = await response.json();
      //console.log(data); 
      addHtml(data);
      return;

    
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      if (attempt === retries) {
        alert("Pokémon not found");
    }
     
  }
}
}


function formatPokemonName(input) {

  let newName = input.toLowerCase();

  // Replace spaces with dashes
  newName = newName.replace(/\s+/g, '-');

  // Remove all remaining special characters except dashes
  newName = newName.replace(/[^a-z0-9-]/g, '');

  return newName; 
}

//console.log(formatPokemonName("12"))
/*
function addHtml(data) {
  const { name,id,weight, height, types, stats, sprites } = data;
  const {front_default} = sprites;
  console.log(front_default);
  // Logging height
  console.log("name:" + name + " id: " + id + " Height:" + height + " Weight: " +weight);

  console.log(types);
  types.forEach((typeObj)=>{
    console.log(`${typeObj.type.name}`)
  });
  stats.forEach((statObj) => {
    console.log(`${statObj.stat.name}:${statObj.base_stat}`);
  });
}
*/

function addHtml(data) {
  resetFields();
  const { name, id, weight, height, types, stats, sprites } = data;
  const { front_default } = sprites;



  // Update the HTML elements dynamically with the data

  // Set the Pokémon name and id
  document.getElementById('pokemon-name').textContent = name.toUpperCase();
  document.getElementById('pokemon-id').textContent = `#${id}`;

  // Set weight and height
  document.getElementById('weight').textContent = `Weight: ${weight}`;
  document.getElementById('height').textContent = `Height: ${height}`;

  // Set types (joining them with a comma if there are multiple types)
  /*
  const typeNames = types.map(type => type.type.name).join(' ');
  console.log(typeNames + "TESTINGH")
  document.getElementById('types').textContent = `${typeNames.toUpperCase()}`;
*/
   types.forEach(typeObj => {
    const typeElement = document.createElement('span'); // Create a new <span> element
    typeElement.textContent = typeObj.type.name.toUpperCase(); // Set the text to the type name
    console.log(typeObj.type.name.toUpperCase())
    document.getElementById("types").appendChild(typeElement); // Append the type element to the #types container
  });

  // Set stats (assuming stats contains objects with base_stat property)
  stats.forEach(statObj => {

    const statValue = statObj.base_stat;
    const statName = statObj.stat.name;
    // Update each stat element dynamically
    document.getElementById(statName).textContent = `${statValue}`;
  });

  // Optionally, if you want to show the Pokémon sprite (front image)
  // Get the span element where the image will be inserted
  const imageContainer = document.getElementById('pokemon-image');

  // Create a new image element
  const imgElement = document.createElement('img');
  imgElement.src = front_default; // Set the image source
  imgElement.alt = `${name} sprite`; // Set the alt text
  imgElement.id = "sprite";

   imageContainer.appendChild(imgElement);
}

function resetFields() {
  document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('types').textContent = '';
    document.getElementById('pokemon-image').innerHTML = ''; 
}
