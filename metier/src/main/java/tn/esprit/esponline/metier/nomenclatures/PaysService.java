package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Pays;
import tn.esprit.esponline.persistence.repositories.nomenclatures.PaysRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class PaysService  implements IPaysService {

    @Autowired
    private PaysRepository paysRepo;


    @Override
    public List<Pays> getAll() throws SQLException {
        return paysRepo.findAll();
    }

    @Override
    public Pays findById(int id) {
        return paysRepo.findById(id);
    }

    @Override
    public void delete(Pays entity) {
        paysRepo.delete(entity);
    }
}
