const pokeBox = document.querySelector('.poke-box')
const form = document.querySelector('form')
const inputVal = document.querySelector('.count')
const btnOk = document.querySelector('.btn')


let pokemonCount = 0

// GET INPUT VALUE
form.addEventListener('submit', (e) => {
    e.preventDefault()
    pokemonCount = +inputVal.value
    // reset table
    pokeBox.innerHTML = ''
    // fetch pokemons
    fetchPokemons()
    // reset input
    inputVal.value = ''
})

// SUBMIT INPUT VALUE WITH OK BTN
btnOk.addEventListener('submit', (e) => {
    e.preventDefault()
    pokemonCount = +inputVal.value
    pokeBox.innerHTML = ''
    fetchPokemons()
    inputVal.value = ''
})

// colors for types of pokemon
const colors = {
    fire: '#fddfdf',
    grass: '#defde0',
    electric: '#fcf7de',
    water: '#def3fd',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#4ceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#f5f5f5',
    fighting: '#e6e0d4',
    normal: '#f5f5f5'
}
// pulled all the keys from object into array
const mainTypes = Object.keys(colors)
console.log(mainTypes)

// sending i as argument id to getpokemon function
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()

    // console.log(data)
    createPokemonCard(data)
}

fetchPokemons()

function createPokemonCard(data) {

    const pokeEl = document.createElement('div')
    pokeEl.classList.add('pokemon')
    // destructuring all data
    let { height, id, name, weight } = data
    // uppercase first letter of name
    name = name[0].toUpperCase() + name.slice(1)
    // added zeros before and ID
    let idwithZeros = id.toString().padStart(3, '0')
    // get all the types from data
    const poke_types = data.types.map(type => type.type.name)
    // console.log(poke_types)
    // isolate/filter true type
    const type = mainTypes.find(type => poke_types.indexOf(type) > -1)
    // console.log(type)

    const pokemonHTML = `
    <div class="img-box">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="">
            </div>
            <div class="info">
                <span class="number">#${idwithZeros}</span>
                <h3 class="name">${name}</h3>
                <div class="physics">
                    <p class="height">Height: <span>${height}</span></p>
                    <p class="weight">Weight: <span>${weight}</span></p>
                </div>
                <small class="type"><span>${type}</span></small>
            </div>
    `
    pokeEl.innerHTML = pokemonHTML
    // change the background to pokemon type color from object colors
    pokeEl.style.backgroundColor = colors[type]
    pokeBox.appendChild(pokeEl)
}