export function getPokemonImage(id: number) {

  // TO-DO
  // fallback link
  {/* <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={`Front default sprite of ${pokemon.name}`} /> */}


  let formattedID = String(id);
  while (formattedID.length < 3) {
    formattedID = '0' + formattedID;
  }

  const imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formattedID}.png`

  return imageURL;
}


export function formatNumberFourDigits(number: number) {
  let num = String(number);
  while (num.length < 3) {
    num = '0' + num;
  }
  return num
}
