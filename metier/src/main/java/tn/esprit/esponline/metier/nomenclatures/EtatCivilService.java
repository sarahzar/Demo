package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.EtatCivil;
import tn.esprit.esponline.persistence.repositories.nomenclatures.EtatCivilRepository;

import java.sql.SQLException;
import java.util.List;

@Service
public class EtatCivilService implements IEtatCivilService {
    @Autowired
    private EtatCivilRepository etatCivilRepository;

    @Override
    public List<EtatCivil> getAll() throws SQLException {
        return etatCivilRepository.findAll();
    }

    @Override
    public EtatCivil findById(int id) {
        return etatCivilRepository.findById(id);
    }
}
