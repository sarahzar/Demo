package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.esponline.persistence.entities.ExperienceEnseignant;

public interface ExperienceEnsRepository extends JpaRepository<ExperienceEnseignant,Long> {

    @Modifying
    @Query("delete from ExperienceEnseignant ens where ens.id = ?1")
    void delete(Long entityId);
}
