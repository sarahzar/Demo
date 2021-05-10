package tn.esprit.esponline.persistence.repositories.authentification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.esponline.persistence.entities.Utilisateur;


import java.util.Optional;

/**
 * User repository for CRUD operations.
 */
public interface UserRepository extends JpaRepository<Utilisateur,Long> {
    public Optional<Utilisateur> findByUsername(String username);
    public Utilisateur findByMail(String mail);
    public Utilisateur findByResetPasswordToken(String token);
    @Query("from Utilisateur u where u.username =:username")
    public Utilisateur getByUsername(String username);
}
