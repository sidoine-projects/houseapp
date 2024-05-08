/**Import des modules néccessaires */
import Axios from './caller.services'



let getActesMedicalsALL = () => {
    return Axios.get("/actmedical");
  };

let getacteMedical = (id) => {
    return Axios.get('/actmedical/'+id)
}


// let acteMedical = (credentials) => {
//     return Axios.post('/smspayer_meth', credentials) 
// }


export const acteMedicalService = {
    getacteMedical,
    getActesMedicalsALL

}