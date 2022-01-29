import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/private/";


class AdminService{

getReport(){
    return axios.get(API_URL+'getReport',{
        params:{
            access_token: localStorage.getItem("token"),
          }
    });
}

getFiltredCondidats(nom, prenom,annee,idDiplome) {

    const search ={
      nom:nom,
      prenom:prenom,
      annee:annee,
      idDiplome:idDiplome
    }

    return axios.post(API_URL + "getCondidats"  ,

        search,
      {
        params: {
          access_token: localStorage.getItem("token"),
        }
      }

    )
  }

}

export default new AdminService();