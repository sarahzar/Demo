package tn.esprit.esponline.api.controllers;

import org.apache.commons.codec.binary.Base64;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.esponline.api.DTO.ConnectionInfoDto;
import tn.esprit.esponline.api.DTO.TokenDto;
import tn.esprit.esponline.api.DTO.UserDto;
import tn.esprit.esponline.persistence.entities.Utilisateur;
import tn.esprit.esponline.metier.exceptions.RestTemplateResponseErrorHandler;
import tn.esprit.esponline.metier.authentification.IUserService;



import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.util.Arrays;

@CrossOrigin
@RestController
public class AuthentificationController {

    @Autowired
    private IUserService userService;

    @Value("${error.user.not.found}")
    private String errorUserNotFound;

    @Value("${error.bad.password}")
    private String passwordError;
    @RolesAllowed("ENSEIGNANT")
    @RequestMapping(value = "/showTocken", method = RequestMethod.GET)
    public ResponseEntity<ConnectionInfoDto> getAccesTocken(@RequestParam("username") String username, @RequestParam("password") String password) throws IOException {

        ResponseEntity<String> response = null;
        ObjectMapper mapper=new ObjectMapper();
        TokenDto tokenDto=new TokenDto();
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

        String tocken=null;

        System.out.println("Authorization Code------" );

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setErrorHandler(new RestTemplateResponseErrorHandler());

        // According OAuth documentation we need to send the client id and secret key in the header for authentication
        String credentials = "my-trusted-client:secret";
        String encodedCredentials = new String(Base64.encodeBase64(credentials.getBytes()));

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Basic " + encodedCredentials);

        HttpEntity<String> request = new HttpEntity<String>(headers);

        String access_token_url = "http://localhost:8085/SIRH_Esprit/oauth/token";
        access_token_url += "?grant_type=password";
        access_token_url += "&username="+username;
        access_token_url += "&password="+password;


        Utilisateur connectedUser=userService.getUsrConnected(username);
        UserDto userDto= connectedUser != null
                ?
                new UserDto(connectedUser.getId(),connectedUser.getMail(),connectedUser.getUsername(),connectedUser.getRoles().get(0).getName())
                : null;
       // String hashed=encoder.encode(connectedUser.getPassword());
        boolean testpassword=connectedUser != null ?  encoder.matches(password,connectedUser.getPassword()) : false;

        if(userDto!=null && testpassword) {
            response = restTemplate.exchange(access_token_url, HttpMethod.POST, request, String.class);
            JsonNode node=mapper.readTree(response.getBody());
            tocken=node.path("access_token").asText();
            System.out.println("Access Token Response ---------" + response.getBody());
        }

        if(tocken!=null) {
            tokenDto.setToken(tocken);
        }else if(userDto == null){
            tokenDto.setAuthenticationError(errorUserNotFound);
        }else if(userDto!=null && !encoder.matches(password,connectedUser.getPassword())){
            tokenDto.setAuthenticationError(passwordError);
        }

        ConnectionInfoDto connectionInfoDto=new ConnectionInfoDto(userDto,tokenDto);
        return ResponseEntity.ok().body(connectionInfoDto);
    }
}
