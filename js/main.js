import { fetchPokemon, fetchPokemonDetail } from './api.js'
import { renderPokemons } from './render.js'
import { state } from './state.js'

//Renderização inicial dos cards de pokemon na tela
async function initRenderPokemons(baseList) {
  const details = await Promise.all(
    baseList.map(item => fetchPokemonDetail(item.url))
  )

  renderPokemons(details)  
}

//Faz o filtro dos pokemons baseado no que o usuário digita no input
async function searchPokemons(allList, pokeList, baseList){
  let debounceTimer = null
  const searcInput = document.querySelector('#input_pokemon')

  //"Escuta" digitação no campo de input, filtra e faz debounce de resultados
  searcInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(async () => {
      const search = e.target.value.toLowerCase()

      baseList = search !== '' ? (
        allList.results.filter(item => item.name.toLowerCase().includes(search))
      ): pokeList.results

      console.log(baseList)

      const details = await Promise.all(
        baseList.map(item => fetchPokemonDetail(item.url))
      )

      renderPokemons(details)
      return
    }, 1000)
  })
}

async function pagination(){
  const prevPage = document.querySelector('#prev')
  const nextPage = document.querySelector('#next')

  const pokeList = await fetchPokemon()
  let baseList = pokeList.results

  if(state.currentPage <= 0) {
    prevPage.setAttribute('disabled', true)
  }

  prevPage.addEventListener('click', async () => {
    console.log('Página anterior')
    state.currentPage --
    const pokeList = await fetchPokemon(state.currentPage * state.limit, 18)
    let baseList = pokeList.results
    initRenderPokemons(baseList)
    if(state.currentPage <= 0) {
      prevPage.setAttribute('disabled', true)
    }
  })

  nextPage.addEventListener('click', async () => {
    state.currentPage ++
    const pokeList = await fetchPokemon(state.currentPage * state.limit, 18)
    let baseList = pokeList.results
    initRenderPokemons(baseList)
    prevPage.removeAttribute('disabled')
  })
}


window.addEventListener('load', async () => {
  fetchPokemon()

  const allList = await fetchPokemon(0, 2000)
  const pokeList = await fetchPokemon()
  let baseList = pokeList.results


  searchPokemons(allList, pokeList, baseList)
  initRenderPokemons(baseList)
  pagination()
})