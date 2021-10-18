package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.esponline.persistence.entities.ExperienceEnseignant;
import tn.esprit.esponline.persistence.entities.Recherche;

public interface RechercheRepository extends JpaRepository<Recherche,Long> {

    @Modifying
    @Query("delete from Recherche r where r.id = ?1")
    void delete(Long entityId);
}
