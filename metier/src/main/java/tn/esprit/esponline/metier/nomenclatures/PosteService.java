package tn.esprit.esponline.metier.nomenclatures;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Poste;
import tn.esprit.esponline.persistence.repositories.nomenclatures.PosteRepository;


import java.sql.SQLException;
import java.util.List;

@Service
public class PosteService implements IPosteService {

    @Autowired
    private PosteRepository posteRepository;

    @Override
    public List<Poste> getAll() throws SQLException {
        return posteRepository.findAll();
    }

    @Override
    public Poste findById(int id) {
        return posteRepository.findById(id);
    }
}
