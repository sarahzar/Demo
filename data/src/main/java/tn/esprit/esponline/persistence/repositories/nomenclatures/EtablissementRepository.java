package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Etablissement;


public interface EtablissementRepository extends JpaRepository<Etablissement,Long> {

    public Etablissement findById(int id);
}
