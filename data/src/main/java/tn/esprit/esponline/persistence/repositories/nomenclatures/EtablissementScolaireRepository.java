package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Etablissement;
import tn.esprit.esponline.persistence.entities.EtablissementScolaire;

public interface EtablissementScolaireRepository extends JpaRepository<EtablissementScolaire,Long> {

    public EtablissementScolaire findById(long id);
}
