package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.entities.Condidat;
import tn.esprit.esponline.persistence.repositories.condidature.CondidatRepository;


@Service
@Transactional
public class CondidatService implements ICondidatService {

    @Autowired
    private CondidatRepository condidatRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Condidat getCondidatByUsername(String username) {
        return condidatRepository.findByUsername(username);
    }

    @Override
    public void saveCondidat(Condidat condidat) {

        condidatRepository.save(condidat);
    }

    @Override
    public void deleteCondidat(Condidat condidat) {
        condidatRepository.delete(condidat);
    }
}
