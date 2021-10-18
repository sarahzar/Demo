package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.repositories.condidature.RechercheRepository;

@Service
@Transactional
public class RechercheService implements IRechercheService{

    @Autowired
    private RechercheRepository rechercheRepository;

    @Override
    public void deleteById(long id) {
        rechercheRepository.delete(id);
    }
}
