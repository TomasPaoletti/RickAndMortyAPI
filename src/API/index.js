const URL = 'https://rickandmortyapi.com/api';

const getCharacters = async () =>{
    try{
        const response = await fetch(`${URL}/character`)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error){
        return error
    }
};

export default{
    getCharacters
}