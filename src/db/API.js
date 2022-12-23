const url = 'https://rickandmortyapi.com/api/character'

export const callApi = async () => {
  const response = await fetch(url)
  const responseJSON = await response.json()
  console.log(responseJSON.results)
}