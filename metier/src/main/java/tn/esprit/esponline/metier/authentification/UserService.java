package tn.esprit.esponline.metier.authentification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.metier.exceptions.UsernameEmailNotFoundException;
import tn.esprit.esponline.persistence.entities.Role;
import tn.esprit.esponline.persistence.entities.Utilisateur;
import tn.esprit.esponline.persistence.repositories.authentification.RoleRepository;
import tn.esprit.esponline.persistence.repositories.authentification.UserRepository;

import java.util.ArrayList;
import java.util.List;


@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;


    public void save(Utilisateur user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
    }
    public void updateResetPassword(String mail,String token) throws UsernameEmailNotFoundException {
        Utilisateur user=repo.findByMail(mail);
        if (user != null) {
            user.setResetPasswordToken(token);
            repo.save(user);
        } else {
          throw new UsernameEmailNotFoundException("Aucun utulisateur trouvé "
                    + "avec cette adresse! "  );
        }
    }

    public Utilisateur get(String resetPasswordToken){
        return repo.findByResetPasswordToken(resetPasswordToken);
    }

    public void updatePassword(Utilisateur user,String newPassword ){
        BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
        String encodedPassword=encoder.encode(newPassword);

        user.setPassword(encodedPassword);
        user.setResetPasswordToken(null);

        repo.save(user);

    }

    @Override
    public Utilisateur getUsrConnected(String username) {
        return repo.getByUsername(username);
    }

    @Override
    public void delete(Utilisateur user) {
        repo.delete(user);
    }

    @Override
    public int affectRoleToUser(String roleName,String username) {

        int res=0;
        Role role=roleRepository.findByName(roleName);
        Utilisateur user=repo.getByUsername(username);
        if(user!=null && role!=null){
            res=1;
            if(user.getRoles()!=null){
                user.getRoles().clear();
                user.getRoles().add(role);
                repo.save(user);
            }else{
                List<Role> roles=new ArrayList<>();
                roles.add(role);
                repo.save(user);
            }

        }
        return res;
    }

    @Override
    public List<Role> getUserRoles(String username) {
        Utilisateur user=repo.getByUsername(username);
        if(user != null){
            return user.getRoles();
        }
        return null;
    }

    @Override
    public int deleteRoleFromUserRoles(String roleName, String username) {
        int res=0;
        Role role=roleRepository.findByName(roleName);
        Utilisateur user=repo.getByUsername(username);
        if(user!=null && role!=null){
            if(user.getRoles()!=null){
                res=1;
                user.getRoles().remove(role);
                repo.save(user);
            }
        }
        return res;
    }


}
