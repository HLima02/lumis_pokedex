const list = document.querySelector('#poke_list')

export function renderPokemons(pokemons) {
  list.innerHTML = ""

  pokemons.forEach(item => {
    const card = document.createElement('div')
    card.className = 'pokemon_card'

    card.innerHTML = `
      <img src="${item.sprites.front_default}" alt="${item.name}"> 
      <h3>${item.name}</h3>
    `
    list.appendChild(card);
  });
}