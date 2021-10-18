package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Domaine;
import tn.esprit.esponline.persistence.repositories.nomenclatures.DomaineRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class DomaineService implements IDomaineService {

    @Autowired
    private DomaineRepository domaineRepository;

    @Override
    public List<Domaine> getAll() throws SQLException {
        return domaineRepository.findAll();
    }

    @Override
    public Domaine findById(int id) {
        return domaineRepository.findById(id);
    }

    @Override
    public void delete(Domaine entity) {
        domaineRepository.delete(entity);
    }
}
