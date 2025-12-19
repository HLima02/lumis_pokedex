const list = document.querySelector('#poke_list')
const modal = document.querySelector('#modal_info_content')

const typeColors = {
  grass: 'var(--green-plant)',
  fire: 'var(--orange-fire)',
  water: 'var(--blue-water)',
  electric: 'var(--yellow-electric)',
  ground: 'var(--brown-ground)',
  rock: 'var(--gray-rock)',
  poison: 'var(--purple-poison)',
  fairy: 'var(--pink-fairy)',
  ice: 'var(--cyan-ice)',
  fighting: 'var(--red-fighting)',
  ghost: 'var(--dark-ghost)',
  dark: 'var(--black-dark)',
  flying: 'var(--light-blue-flying)',
  steel: 'var(--silver-steel)',
  normal: 'var(--beige-normal)',
  psychic: 'var(--purple-psychic)',
  bug: 'var(--green-bug)',
  dragon: 'var(--blue-dragon)'
}

export function renderPokemons(pokemons) {
  list.innerHTML = ""

  pokemons.forEach(item => {
    const card = document.createElement('div')
    card.className = 'pokemon_card'
    card.setAttribute('id', item.id)

    const mainType = item.types[0].type.name
    const typeColor = typeColors[mainType] 

    card.innerHTML = `
    <div class="pokemon_card_label">
      <span
        class="pokemon_type" 
        style="color: ${typeColor}">${mainType}</span>
      <span>#${item.id}</span>
    </div>
      
      <img src="${item.sprites.front_default}" alt="${item.name}"> 
      <h3>${item.name}</h3>
    `
    list.appendChild(card);
  });
}

export function renderModalPokemon(name, imgUrl, description, mainType){
  modal.innerHTML = ""

  const modalContent = document.createElement('div')
  modalContent.className = 'poke_modal_content'

  const typeColor = typeColors[mainType] 
  console.log(typeColor)
  modalContent.style.backgroundColor = typeColor

  modalContent.innerHTML = `
    <div class="poke_modal_txt">
     <div class="left_poke">
      <img src="${imgUrl}" alt="${name}"> 
     </div>
     <div class="right_poke">
      <h3>${name}</h3>
      <p>${description}</p>
     </div>
    </div>
  `

  modal.appendChild(modalContent)
}