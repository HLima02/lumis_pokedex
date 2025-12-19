import { fetchPokemon, fetchPokemonDetail } from './api.js'
import { renderPokemons, renderModalPokemon } from './render.js'
import { state, pokemonDetailState } from './state.js'

//Renderização inicial dos cards de pokemon na tela
async function initRenderPokemons(baseList) {
  const details = await Promise.all(
    baseList.map(item => fetchPokemonDetail(item.url))
  )

  renderPokemons(details)  
  getPokemonDetail()
}

//Faz a busca de nome, imagem e descrição do pokemon e renderiza dentro do modal
async function getPokemonDetail() {
  let cardList = document.querySelectorAll('.pokemon_card')
  let pokemonDetailModal = document.querySelector('#modal')
  let closeModal = document.querySelector(".close_modal")

  cardList.forEach((item) => {
    item.addEventListener('click', async () => {
      const descriptionModal = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon-species/${item.id}`)
      const defaultDetails = await fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${item.id}`)

      pokemonDetailState.name = defaultDetails.name
      pokemonDetailState.imageurl = defaultDetails.sprites.front_default
      pokemonDetailState.mainType = defaultDetails.types[0].type.name
      console.log(pokemonDetailState.mainType)
      pokemonDetailState.description = descriptionModal.flavor_text_entries[0].flavor_text
      renderModalPokemon(pokemonDetailState.name, pokemonDetailState.imageurl, pokemonDetailState.description, pokemonDetailState.mainType )
      pokemonDetailModal.style.display = 'flex'
    })
  })

  closeModal.addEventListener('click', () => {
    pokemonDetailModal.style.display = 'none'
  })
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

//Funções com a mecânica de passar e voltar páginas
async function pagination(){
  const prevPage = document.querySelector('#prev')
  const nextPage = document.querySelector('#next')

  const pokeList = await fetchPokemon()
  let baseList = pokeList.results


  if(state.currentPage <= 0) {
    prevPage.setAttribute('disabled', true)
  }

  prevPage.addEventListener('click', async () => {
    state.currentPage --
    const pokeList = await fetchPokemon(state.currentPage * state.limit, 18)
    let baseList = pokeList.results
    initRenderPokemons(baseList)
    
    if(state.currentPage <= 0) {
      prevPage.setAttribute('disabled', true)
    }
    matchIndice()
  })

  nextPage.addEventListener('click', async () => {
    state.currentPage ++
    const pokeList = await fetchPokemon(state.currentPage * state.limit, 18)
    let baseList = pokeList.results
    initRenderPokemons(baseList)
    prevPage.removeAttribute('disabled')
    
    if(state.currentPage >= 75) {
      nextPage.setAttribute('disabled', true)
    }
    matchIndice()
  })
}

//função para criar os indices de página baseado no tamanho da lista
function createPaginationIndice(baseList) {
  const indecesSection = document.querySelector('.pagination_count')
  const numberOfPages = baseList / state.limit

  for(let i = 1; i < numberOfPages; i++){
    const indice = document.createElement('div')
    indice.className = 'pagination_count_item'
    indice.id = i
    indice.innerHTML = i
    indecesSection.appendChild(indice)
  }
}

function matchIndice() {
  let countList = 1350
  let indicesList = document.querySelectorAll('.pagination_count_item')
  const currentIndex = state.currentPage 

  indicesList.forEach((item, index) => {
    item.classList.toggle(
      'pagination_count_item_active',
      index === currentIndex
    )
  })
}


window.addEventListener('load', async () => {
  const allList = await fetchPokemon(0, 2000)
  const pokeList = await fetchPokemon()
  state.count = pokeList.count
  let baseList = pokeList.results

  initRenderPokemons(baseList)
  searchPokemons(allList, pokeList, baseList)
  pagination()
  createPaginationIndice(allList.count)
  matchIndice() 
})