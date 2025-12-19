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
  let debounceTimer = null
  const searcInput = document.querySelector('#input_pokemon')


  const pokeList = await fetchPokemon()
  let baseList = pokeList.results

  searcInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
      const search = e.target.value.toLowerCase()

      baseList = search !== '' ? (
        pokeList.results.filter(item => item.name.toLowerCase().includes(search))
      ): pokeList.results

      const details = await Promise.all(
        baseList.map(item => fetchPokemonDetail(item.url))
      )

      renderPokemons(details)
      return
    }, 1000)
  })

  const details = await Promise.all(
    baseList.map(item => fetchPokemonDetail(item.url))
  )

  renderPokemons(details)

  
  // searcInput.addEventListener('input', (e) => {
  //   clearTimeout(debounceTimer)

  //   debounceTimer = setTimeout(async () => {
  //     const search = e.target.value.toLowerCase()

  //     const filteredList = search ? (
  //       baseList.filter(
  //         item => item.toLowerCase().includes(search)
  //       )
  //     ) : baseList

  //     const details = await Promise.all(
  //       filteredList.map(iitem => fetchPokemonDetail(item.url))
  //     )

  //   }, 3000)
  // })

 
  
})