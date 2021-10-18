package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.esponline.persistence.entities.ExperienceEnseignant;
import tn.esprit.esponline.persistence.entities.ExperienceProfessionel;

public interface ExperienceProRepository extends JpaRepository<ExperienceEnseignant,Long> {

    @Modifying
    @Query("delete from ExperienceProfessionel pro where pro.id = ?1")
    void delete(Long entityId);
}
