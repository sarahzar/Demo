package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Etablissement;
import tn.esprit.esponline.persistence.repositories.nomenclatures.EtablissementRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class EtablissementService implements IEtablissementService {

    @Autowired
    private EtablissementRepository etablissementRepository;

    @Override
    public List<Etablissement> getAll() throws SQLException {
        return etablissementRepository.findAll();
    }

    @Override
    public Etablissement findById(int id) {
        return etablissementRepository.findById(id);
    }

    @Override
    public void delete(Etablissement entity) {
        etablissementRepository.delete(entity);
    }
}
