package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.repositories.nomenclatures.DiplomeRepository;
import tn.esprit.esponline.persistence.entities.Diplome;


import java.sql.SQLException;
import java.util.List;

@Service
public class DiplomeService implements IDiplomeService {

    @Autowired
    private DiplomeRepository diplomeRepository;

    @Override
    public List<Diplome> getAll() throws SQLException {
        return diplomeRepository.findAll();
    }

    @Override
    public Diplome findById(int id) {
        return diplomeRepository.findById(id);
    }

    @Override
    public void delete(Diplome entity) {
        diplomeRepository.delete(entity);
    }
}
