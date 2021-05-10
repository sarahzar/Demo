
import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";
class UserService{
    register(username, password,email,role) {
        const user = {
            login : username,
            password: password,
            mail: email,
            role: role
        }
        return axios.post(API_URL + "signup", 
            user,    
        );
      }
    getUser(username) {
        // accesToken=localStorage.getItem("token");
        return axios.get(
            // url
            API_URL + "user" + "/" + username

        )
            .then(resp => {
                console.log(resp.data);
               return resp.data;
            });

    }
    
}

export default new UserService();