package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.EtatCivil;


public interface EtatCivilRepository extends JpaRepository<EtatCivil,Long> {

    public EtatCivil findById(int id);
}
