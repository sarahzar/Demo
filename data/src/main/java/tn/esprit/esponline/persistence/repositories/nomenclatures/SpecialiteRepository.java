package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Specialite;


public interface SpecialiteRepository extends JpaRepository<Specialite,Long> {

    public Specialite findById(int id);
}
