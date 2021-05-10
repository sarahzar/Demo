package tn.esprit.esponline.persistence.repositories.condidature;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.esponline.persistence.entities.Module;

public interface ModuleRepository extends JpaRepository<Module,Long> {
    public Module findById(int id);
}
