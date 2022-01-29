package tn.esprit.esponline.persistence.repositories.administration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.esponline.persistence.entities.Condidat;

@Repository
public interface RapportRepository extends CrudRepository<Condidat,Long> {

    @Query("select count(username) from Condidat ")
    public long countAll();

    public long countBySexe(String sexe);
    @Query("select count(username) from Condidat  where aConfirmer=true")
    public long countConfirmed();

    public long countByDomaine_Libelle(String domaine);

    public long countByRecherchesIsNotNull();

    public long countByDernierDiplome_Diplome_Libelle(String diplome);
    

}
