package tn.esprit.esponline.api.DTO;

public class ResetInfosDto {

    private String token;
    private String newPassword;

    public ResetInfosDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
