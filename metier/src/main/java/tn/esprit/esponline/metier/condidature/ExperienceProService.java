package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.repositories.condidature.ExperienceProRepository;

@Service
@Transactional
public class ExperienceProService implements IExperienceProService{

    @Autowired
    private ExperienceProRepository experienceProRepository;

    @Override
    public void deleteById(long id) {
        experienceProRepository.delete(id);
    }
}
