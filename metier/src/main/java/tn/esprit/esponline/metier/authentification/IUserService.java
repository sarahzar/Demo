package tn.esprit.esponline.metier.authentification;


import tn.esprit.esponline.metier.exceptions.UsernameEmailNotFoundException;
import tn.esprit.esponline.persistence.entities.Role;
import tn.esprit.esponline.persistence.entities.Utilisateur;

import java.util.List;

public interface IUserService {

    public void save(Utilisateur user);
    public void updateResetPassword(String mail,String token) throws UsernameEmailNotFoundException;
    public Utilisateur get(String resetPasswordToken);
    public void updatePassword(Utilisateur user,String newPassword );
    public Utilisateur getUsrConnected(String username);
    public void delete(Utilisateur user);
    public int affectRoleToUser(String roleName,String username);
    public List<Role> getUserRoles(String username);
    public int deleteRoleFromUserRoles(String roleName,String username);

}
