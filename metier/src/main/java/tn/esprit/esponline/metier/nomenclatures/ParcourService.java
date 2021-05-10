package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Parcour;
import tn.esprit.esponline.persistence.repositories.nomenclatures.ParcourRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class ParcourService implements IParcourService {

    @Autowired
    private ParcourRepository parcourRepository;

    @Override
    public Parcour findByCondidat_Id(int id) {
        return parcourRepository.findByCondidat_Id(id);
    }

    @Override
    public List<Parcour> getAll() throws SQLException {
        return null;
    }

    @Override
    public Parcour findById(int id) {
        return null;
    }
}
