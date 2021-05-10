package tn.esprit.esponline.api.DTO;

public class ConnectionInfoDto {

    private UserDto user;
    private TokenDto accessToken;


    public ConnectionInfoDto() {
    }

    public ConnectionInfoDto(UserDto user, TokenDto token) {
        this.user = user;
        this.accessToken = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public TokenDto getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(TokenDto accessToken) {
        this.accessToken = accessToken;
    }
}
