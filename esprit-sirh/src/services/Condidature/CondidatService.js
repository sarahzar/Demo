import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";
const defaultElemExpEns = { id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "" }, poste: { id: -1, libelle: "" }, moduleEnseigne: { id: -1, libelle: "" } }
const defaultElemExpPro = { id: -1, dateDebut: "", dateFin: "", etablissement: { id: -1, libelle: "", telephone: -1, mail: "" }, poste: { id: -1, libelle: "" }, pays: { id: -1, libelle: "" }, ville: "" }
const defaultElemCpt = { id: -1, titre: "", description: "" }
const defaultElemRecherche = { id: -1, thematique: { id: -1, description: "" }, chapitreLivre: 0, articleJornaux: 0, articleConference: 0, pfe: 0, mastere: 0, these: 0 }
const ACCESS_TOKEN = localStorage.getItem("token");
class CondidatService {

  registerCondidatInfos(username, formdata) {

    return axios.post(API_URL + "private/saveCondidatInfos" + "/" + username,
      formdata,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      }
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
  uploadFiles(file) {
    return axios.post(API_URL + "private/upload",
      file,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      }
    )
  }
  downlodFiles(fileName, username) {
    return axios.get(API_URL + "private/files/" + fileName + "/" + username, {
      params: {
        access_token: localStorage.getItem("token"),
      }
    }
    )
  }
  getCondidat(username) {

    return axios.get(API_URL + "private/getCondidat/" + username, {
      params: {
        access_token: localStorage.getItem("token"),
      }
    })
      .then(resp => {
        return resp.data;
      }
      );
  }

  confirmerCondidature(username) {
    return axios.post(API_URL + "private/confirmer/" + username, null,{
      params: {
        access_token: localStorage.getItem("token"),
      }
    })
  }

  demandeModif(username) {
    return axios.post(API_URL + "private/demandeModif" + "/" + username, null,{
      params: {
        access_token: localStorage.getItem("token"),
      }
    })
  }

  updateListEmpty(condidatToSave) {

    if (condidatToSave.competences && condidatToSave.competences.length == 1 && JSON.stringify(defaultElemCpt) === JSON.stringify(condidatToSave.competences[0])) {
      condidatToSave.competences = [];
    }
    if (condidatToSave.experienceEnseignants && condidatToSave.experienceEnseignants.length == 1 && JSON.stringify(defaultElemExpEns) === JSON.stringify(condidatToSave.experienceEnseignants[0])) {
      condidatToSave.experienceEnseignants = [];
    }
    if (condidatToSave.experienceProfessionels && condidatToSave.experienceProfessionels.length == 1 && JSON.stringify(defaultElemExpPro) === JSON.stringify(condidatToSave.experienceProfessionels[0])) {
      condidatToSave.experienceProfessionels = [];
    }
    if (condidatToSave.recherches && condidatToSave.recherches.length == 1 && JSON.stringify(defaultElemRecherche) === JSON.stringify(condidatToSave.recherches[0])) {
      condidatToSave.recherches = [];
    }

    return condidatToSave;
  }

  updateUserInfos(username, formdata) {

    return axios.post(API_URL + "private/updateUserInfos" + "/" + username,

      formdata,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      }

    )
  }

}
export default new CondidatService();