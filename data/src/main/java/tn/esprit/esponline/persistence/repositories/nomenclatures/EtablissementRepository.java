package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.esponline.persistence.entities.Etablissement;


public interface EtablissementRepository extends JpaRepository<Etablissement,Long> {

    public Etablissement findById(long id);

    public Etablissement findByLibelle(String libelle);

   @Query(value="insert into etablissement (libelle) values (:libelle)",
           nativeQuery = true)
    public void add(@Param("libelle") String libelle);
}
