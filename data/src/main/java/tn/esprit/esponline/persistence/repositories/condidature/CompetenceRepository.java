package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.esponline.persistence.entities.Competence;

public interface CompetenceRepository extends JpaRepository<Competence,Long> {

    @Modifying
    @Query("delete from Competence c where c.id = ?1")
    void delete(Long entityId);
}
