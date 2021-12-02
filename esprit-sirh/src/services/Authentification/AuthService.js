import axios from "axios";
const API_URL = "http://localhost:8085/SIRH_Esprit/";

const userLogin = { username: '' };


class AuthService {

    login(username, password) {

        return axios.get(
            // url
            API_URL + 'showTocken'

            , {
                params: {
                    username: username,
                    password: password
                }
            }

        )
            .then(resp => {
                if (resp.data.user) {
                    localStorage.setItem("login", resp.data.user.login)
                }
                return resp.data;
            });

    }
    getLogin() {
        return localStorage.getItem("login");
        // return userLogin;
    }
    setUsername(username) {
        userLogin.username = username;
    }
    getUsername() {
        return userLogin;
    }

    logout() {
        localStorage.clear()
    }

}

export default new AuthService();

