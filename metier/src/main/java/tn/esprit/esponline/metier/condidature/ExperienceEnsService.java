package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.repositories.condidature.ExperienceEnsRepository;

@Service
@Transactional
public class ExperienceEnsService implements IExperienceEnsService{

    @Autowired
    private ExperienceEnsRepository experienceEnsRepository;

    @Override
    public void deleteById(long id) {
        experienceEnsRepository.delete(id);
    }
}
