package tn.esprit.esponline.api.DTO;

public class TokenDto {

    private  String token;
    private String authenticationError;

    public TokenDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAuthenticationError() {
        return authenticationError;
    }

    public void setAuthenticationError(String authenticationError) {
        this.authenticationError = authenticationError;
    }
}
