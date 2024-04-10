document.addEventListener("DOMContentLoaded", () => {
    const pokemonName = getPokemonName()
    
    changeTitle(pokemonName)
    fetchPokemon(pokemonName)
})

function getPokemonName() {
    if (!location.search) {
        return
    }

    const searchParams = new URLSearchParams(location.search)
    return searchParams.get("evolucao")
}

function changeTitle(name) {
    document.title = `Página do Pokémon ${name}`
}

async function fetchPokemon(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //     .then((fetchData) => {
    //         console.log("fetchData")
    //         return fetchData.json()
    //     })
    //     .then((jsonData) => {
    //         console.log(jsonData.sprites.front_default)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    try {
        const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const jsonData = await fetchData.json()

        const imgSrc = jsonData.sprites.front_default
        createPokemonImage(name, imgSrc)
    } catch (error) {
        console.error({error})
    }
}

function createPokemonImage(pokemonName, imageUrl) {
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = "Imagem do pokemon " + pokemonName
    img.width = "150"
    img.heigth = "150"

    const section = document.querySelector("#info-pokemon")
    
    section.appendChild(img)
}