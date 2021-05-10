package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Condidat;


public interface CondidatRepository extends JpaRepository<Condidat, Long> {

    public Condidat findByUsername(String username);
}
