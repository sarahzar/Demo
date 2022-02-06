import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/private/";


class AdminService {

  getReport() {
    return axios.get(API_URL + 'getReport', {
      params: {
        access_token: localStorage.getItem("token"),
      }
    });
  }

  getFiltredCondidats(nom, prenom, annee, idDiplome) {

    const search = {
      nom: nom,
      prenom: prenom,
      annee: annee,
      idDiplome: idDiplome
    }

    return axios.post(API_URL + "getCondidats",

      search,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      }

    )
  }

  getAllUsers() {
    return axios.get(API_URL + 'getAllUsers',
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      });
  }

  lockUser(username, locked) {
    return axios.post(API_URL + 'lock/' + username + "/" + locked,
      null,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      });
  }

  confirmUser(username, confirmed) {
    return axios.post(API_URL + 'confirm/' + username + "/" + confirmed,
      null,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      });
  }
  deleteUser(username) {
    return axios.delete(API_URL + 'delete/' + username,

      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      });
  }
  
  affecteRoleToUser(rolename,username){
    return axios.post(API_URL + 'affecte/' + username + "/" + rolename,
    null,
    {
      params: {
        access_token: localStorage.getItem("token"),
      }
    });
  }

  getUserRoles(username){
    return axios.get(API_URL + 'getRoles/' + username ,
    {
      params: {
        access_token: localStorage.getItem("token"),
      }
    });
  }

  deleteUserRole(rolename,username){
    return axios.delete(API_URL + 'deleteRole/' + username + "/" + rolename,
    {
      params: {
        access_token: localStorage.getItem("token"),
      }
    });
  }

  getAllRoles(){
    return axios.get(API_URL + 'getAllRoles/',
    {
      params: {
        access_token: localStorage.getItem("token"),
      }
    });
  }

}

export default new AdminService();