package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Diplome;


public interface DiplomeRepository  extends JpaRepository<Diplome,Long> {

    public Diplome findById(int id);
}
