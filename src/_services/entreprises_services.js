/**Import des modules néccessaires */
import Axios from './caller.services'

let getAllpays = () => {
    return Axios.get('/pays')
}
let getSecteursActivite = () => {
    return Axios.get('/getSecteursActivite')
}


let getPays = (id) => {
    return Axios.get('/pays/'+id)
}

let getpays = (pays) => {
    return Axios.get('/pays/'+pays.id,pays)
}

let addEntreprise = (credentials) => {
    return Axios.post('/entreprises', credentials)
}

let updatePays = (pays) => {
    return Axios.put('/pays/'+pays.id,pays )
}

let deletePays = (id) => {
    return Axios.delete('/pays/'+id)
}

export const entrepriseService = {
    addEntreprise,
    getSecteursActivite,
    
    
    getAllpays,
    getPays,
    getpays,
   
    updatePays,
    deletePays,
}