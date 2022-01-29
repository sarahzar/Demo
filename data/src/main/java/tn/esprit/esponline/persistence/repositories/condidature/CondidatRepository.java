package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import tn.esprit.esponline.persistence.entities.Condidat;


public interface CondidatRepository extends JpaRepository<Condidat, Long>, JpaSpecificationExecutor<Condidat> {

    public Condidat findByUsername(String username);
}
