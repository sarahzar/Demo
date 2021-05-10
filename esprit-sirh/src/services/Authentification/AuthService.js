import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

const userLogin = {username: '' };
    

class AuthService{
    
   login(username,password){
   
return   axios.get(
    // url
    API_URL+'showTocken'
    
    , {
        params: {
            username: username,
            password: password
        }
    }
    
    )
    .then(resp => {   
        localStorage.setItem("userConnected", JSON.stringify(resp.data.user))
        return resp.data;  
    });

}
    getUserConneced(){
    return JSON.parse(localStorage.getItem("userConnected"));
   // return userLogin;
    }
    setUsername(username){
        userLogin.username=username;   
    }
    getUsername(){
        return userLogin;
    }

    logout() {
        localStorage.removeItem("userConnected");     
    }
    
}

export default new AuthService();

