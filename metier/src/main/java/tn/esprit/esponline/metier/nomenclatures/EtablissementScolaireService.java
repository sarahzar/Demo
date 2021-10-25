package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.entities.EtablissementScolaire;
import tn.esprit.esponline.persistence.repositories.nomenclatures.EtablissementRepository;
import tn.esprit.esponline.persistence.repositories.nomenclatures.EtablissementScolaireRepository;

import java.sql.SQLException;
import java.util.List;

@Service
@Transactional
public class EtablissementScolaireService implements  IEtablissementScolaireService {

    @Autowired
    private EtablissementScolaireRepository etablissementScolaireRepository;


    @Override
    public List<EtablissementScolaire> getAll() throws SQLException {
        return etablissementScolaireRepository.findAll();
    }

    @Override
    public EtablissementScolaire findById(int id) {
        return null;
    }

    @Override
    public void delete(EtablissementScolaire entity) {
        etablissementScolaireRepository.delete(entity);
    }
}
