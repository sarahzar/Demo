package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Specialite;
import tn.esprit.esponline.persistence.repositories.nomenclatures.SpecialiteRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class SpecialiteService implements ISpecialiteService {

    @Autowired
    private SpecialiteRepository specialiteRepository;

    @Override
    public List<Specialite> getAll() throws SQLException {
        return specialiteRepository.findAll();
    }

    @Override
    public Specialite findById(int id) {
        return specialiteRepository.findById(id);
    }

    @Override
    public void delete(Specialite entity) {
        specialiteRepository.delete(entity);
    }
}
