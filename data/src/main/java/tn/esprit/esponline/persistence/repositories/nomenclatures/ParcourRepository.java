package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Parcour;


public interface ParcourRepository extends JpaRepository<Parcour,Long> {

    public Parcour findById(int id);
    public Parcour findByCondidat_Id(int id);
}
