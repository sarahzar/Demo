package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Module;
import tn.esprit.esponline.persistence.repositories.condidature.ModuleRepository;

import java.sql.SQLException;
import java.util.List;

@Service
public class ModuleService implements IModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public List<Module> getAll() throws SQLException {
        return moduleRepository.findAll();
    }

    @Override
    public Module findById(int id) {
        return moduleRepository.findById(id);
    }

    @Override
    public void delete(Module entity) {
        moduleRepository.delete(entity);
    }
}
