package tn.esprit.esponline.persistence.repositories.authentification;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Role;


public interface RoleRepository extends JpaRepository<Role,Long> {

    public Role findByName(String name);

}
