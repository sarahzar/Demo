package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.repositories.condidature.CompetenceRepository;

@Service
@Transactional
public class CompetenceService implements ICompetenceService{

    @Autowired
    private CompetenceRepository competenceRepository;

    @Override
    public void deleteById(long id) {
        competenceRepository.delete(id);
    }
}
