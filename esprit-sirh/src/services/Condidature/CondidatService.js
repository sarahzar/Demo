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
  downlodFiles(fileName){
    return axios.get(API_URL + "files/"+fileName
    )
  }

}
export default new CondidatService();