import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

class CondidatService{

  registerCondidatInfos(username,formdata) {

    return axios.post(API_URL + "saveCondidatInfos" + "/" + username,
   
      formdata
    
    )
  }

  addListParcours(username, listeParcours) {
    return axios.post(API_URL + "addListParcours" + "/" + username,
      listeParcours
    )
  }
  addListExperiencesEnseignant(username, condidatExperEnseignt) {
    return axios.post(API_URL + "addExperienceEnseignant" + "/" + username,
    condidatExperEnseignt
    )
  }
  addListExperiencesProfessionelles(username, condidatExperProfessionel) {
    return axios.post(API_URL + "addExperienceProfessionel" + "/" + username,
    condidatExperProfessionel
    )
  }
  uploadFiles(file){
    return axios.post(API_URL + "upload",
    file
    )
  }
  downlodFiles(fileName,username){
    return axios.get(API_URL + "files/"+fileName+"/"+username
    )
  }
  getCondidat(username){
    const config = {
      method: 'get',
      url: API_URL + "getCondidat/"+username,
  }
    return axios.get(API_URL + "getCondidat/"+username)
    .then(resp => {   
      return resp.data;  
  }
    );
  }

  confirmerCondidature(username) {
    return axios.post(API_URL + "confirmer" + "/" + username)
  }
}
export default new CondidatService();