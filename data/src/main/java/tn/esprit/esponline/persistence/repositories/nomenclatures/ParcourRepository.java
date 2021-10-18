package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.entities.Parcour;


public interface ParcourRepository extends JpaRepository<Parcour,Long> {

    public Parcour findById(int id);
    public Parcour findByCondidat_Id(int id);
    @Modifying
    @Query("delete from Parcour p where p.id = ?1")
    void delete(Long entityId);
}
