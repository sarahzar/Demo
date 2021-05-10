package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.esprit.esponline.api.DTO.ResponseDto;
import tn.esprit.esponline.api.DTO.UserDto;
import tn.esprit.esponline.metier.condidature.ICondidatService;
import tn.esprit.esponline.persistence.entities.Condidat;
import tn.esprit.esponline.persistence.entities.Role;
import tn.esprit.esponline.persistence.entities.Utilisateur;
import tn.esprit.esponline.metier.authentification.IRoleService;
import tn.esprit.esponline.metier.authentification.IUserService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private ICondidatService condidatService;

    @Value("${error.user.registration}")
    private String errorUserRegistration;

    @Value("${success.user.registration}")
    private String successUserRegistration;

    @Value("${error.user.exist}")
    private String errorUserExist;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<ResponseDto>  register(@RequestBody UserDto user){
        ResponseDto resp=new ResponseDto();
        List<Role> userRoles=new ArrayList<>();

        Utilisateur connectedUser=userService.getUsrConnected(user.getLogin());
        Role role=roleService.findByName(user.getRole());

        if(role== null){
            userRoles.add(new Role(user.getRole()));
        }else{
            userRoles.add(role);
        }
      /*  Utilisateur u=new Utilisateur(
                user.getLogin(), //username
                user.getPassword(), //password
                user.getMail(),
                userRoles,//roles
                true//Active
        );*/

        Condidat condidat=new Condidat(
                user.getLogin(), //username
                passwordEncoder.encode(user.getPassword()), //password
                user.getMail(),
                userRoles,//roles
                true//Active

        ) ;
        try {
            if(connectedUser==null) {
                condidatService.saveCondidat(condidat);
                //userService.save(u);
                resp.setSuccesMessage(successUserRegistration);
            }else {
                resp.setErrorMessage(errorUserExist);
            }
        }catch (Exception e){
            resp.setErrorMessage(errorUserRegistration);
        }
        return ResponseEntity.ok().body(resp);
    }
    @GetMapping("/user/{login}")
    public ResponseEntity<Utilisateur> getUserProfile(@PathVariable String login){

        Utilisateur user=userService.getUsrConnected(login);
        return ResponseEntity.ok().body(user);
    }

}
