package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Pays;


public interface PaysRepository extends JpaRepository<Pays,Long> {
    public Pays findById(int id);
}
