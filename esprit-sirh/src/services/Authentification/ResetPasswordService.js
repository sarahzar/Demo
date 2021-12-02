import axios from "axios";

class ResetPasswordService {

    forgotPassword(mailInfos) {

        return axios.post("http://localhost:8085/SIRH_Esprit/forgot_password", mailInfos).then(resp => {
            console.log(resp.data);

        });

    }

}

export default new ResetPasswordService();