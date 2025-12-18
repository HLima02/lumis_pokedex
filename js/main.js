import { fetchPokemon, fetchPokemonDetail } from './api.js'
import { renderPokemons } from './render.js'
import { state } from './state.js'

// export async function loadPokemons() {
//   const offset = (state.currentPage -1) * state.limit
//   const data = await fetchPokemon(state.limit, offset)

//   const details = await Promise.all(
//     data.results.map(p => fetchPokemonDetail(p.url))
//   )

//   //filtro para debounce 
//   const filtered = details.filter(p => 
//     p.name.includes(state.search)
//   )

// }

window.addEventListener('load', async () => {
  fetchPokemon()
  const pokeList = await fetchPokemon()

  const details = await Promise.all(
    pokeList.results.map(item => fetchPokemonDetail(item.url))
  )

  renderPokemons(details)
})