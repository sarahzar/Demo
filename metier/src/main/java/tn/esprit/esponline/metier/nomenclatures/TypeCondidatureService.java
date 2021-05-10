package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.TypeCondidature;
import tn.esprit.esponline.persistence.repositories.nomenclatures.TypeCondidatureRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class TypeCondidatureService implements ITypeCondidatureService {

    @Autowired
    private TypeCondidatureRepository typeCondidatureRepository;

    @Override
    public List<TypeCondidature> getAll() throws SQLException {
        return typeCondidatureRepository.findAll();
    }

    @Override
    public TypeCondidature findById(int id) {
        return typeCondidatureRepository.findById(id);
    }
}
