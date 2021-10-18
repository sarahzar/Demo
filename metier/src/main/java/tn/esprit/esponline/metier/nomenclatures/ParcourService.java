package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.entities.Parcour;
import tn.esprit.esponline.persistence.repositories.nomenclatures.ParcourRepository;


import java.sql.SQLException;
import java.util.List;

@Service
@Transactional
public class ParcourService implements IParcourService {

    @Autowired
    private ParcourRepository parcourRepository;

    @Override
    public Parcour findByCondidat_Id(int id) {
        return parcourRepository.findByCondidat_Id(id);
    }

    @Override
    public List<Parcour> getAll() throws SQLException {
        return parcourRepository.findAll();
    }

    @Override
    public Parcour findById(int id) {
        return parcourRepository.findById(id);
    }

    @Override
    public void delete(Parcour entity) {
        parcourRepository.delete(entity);
    }

    @Override
    public void deleteById(long id) {
        parcourRepository.delete(id);
    }
}
