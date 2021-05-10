package tn.esprit.esponline.metier.authentification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.metier.exceptions.UsernameEmailNotFoundException;
import tn.esprit.esponline.persistence.entities.Utilisateur;
import tn.esprit.esponline.persistence.repositories.authentification.UserRepository;


@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

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




}
