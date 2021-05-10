package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Domaine;


public interface DomaineRepository extends JpaRepository<Domaine,Long> {

    public Domaine findById(int id);
}
