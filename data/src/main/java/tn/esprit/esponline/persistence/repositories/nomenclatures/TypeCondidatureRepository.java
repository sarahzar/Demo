package tn.esprit.esponline.persistence.repositories.nomenclatures;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.TypeCondidature;


public interface TypeCondidatureRepository extends JpaRepository<TypeCondidature,Long> {

    public TypeCondidature findById(int id);

}
