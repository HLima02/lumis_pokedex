const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemon(offset = 0, limit = 18) {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`)
  const data = await response.json()
  return data
}

export async function fetchPokemonDetail(url){
  const response = await fetch(url)
  const data = response.json()
  return data
}