package tn.esprit.esponline.metier.condidature;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.esponline.persistence.entities.Condidat;
import tn.esprit.esponline.persistence.entities.Diplome;
import tn.esprit.esponline.persistence.entities.Domaine;
import tn.esprit.esponline.persistence.repositories.administration.RapportRepository;
import tn.esprit.esponline.persistence.repositories.condidature.CondidatRepository;
import tn.esprit.esponline.persistence.repositories.jpaSpecifications.GenericSpesification;
import tn.esprit.esponline.persistence.repositories.jpaSpecifications.SearchCriteria;
import tn.esprit.esponline.persistence.repositories.jpaSpecifications.SearchOperation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class CondidatService implements ICondidatService {

    @Autowired
    private CondidatRepository condidatRepository;

    @Autowired
    private RapportRepository rapportRepository;

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

    @Override
    public long countAll() {
        return rapportRepository.countAll();
    }

    @Override
    public long countFemmes(String sexe) {
        return rapportRepository.countBySexe(sexe);
    }

    @Override
    public long countDocteurs() {
        return rapportRepository.countByRecherchesIsNotNull();
    }

    @Override
    public long CountConfirme() {
        return rapportRepository.countConfirmed();
    }

    @Override
    public Map<String,Long> countByDomaines(List<Domaine> allDomaines) {
        Map<String,Long> countByDomaine=new HashMap<>();
        allDomaines.forEach(d ->{
            if(!countByDomaine.containsKey(d.getLibelle())) {
                long count = rapportRepository.countByDomaine_Libelle(d.getLibelle());
                countByDomaine.put(d.getLibelle(), count);
            }
        });
        return countByDomaine;
    }

    @Override
    public Map<String, Long> countByDiplome(List<Diplome> allDiplomes) {
        Map<String,Long> countByDiplomes=new HashMap<>();
        allDiplomes.forEach(d ->{
            if(!countByDiplomes.containsKey(d.getLibelle())) {
                long count = rapportRepository.countByDernierDiplome_Diplome_Libelle(d.getLibelle());
                countByDiplomes.put(d.getLibelle(), count);
            }
        });
        return countByDiplomes;
    }

    @Override
    public List<Condidat> getBySpecificCriteria(String nom, String prenom,long idDiplome) {
        GenericSpesification genericSpesification = new GenericSpesification<Condidat>();
        if(nom!=null && nom!="") {
            genericSpesification.add(new SearchCriteria("nom", nom, SearchOperation.EQUAL));
        }
        if(prenom!=null && prenom!="") {
            genericSpesification.add(new SearchCriteria("prenom", prenom, SearchOperation.EQUAL));
        }
        if(idDiplome > 0) {
            genericSpesification.add(new SearchCriteria("dernierDiplome","diplome","id", idDiplome, SearchOperation.EQUAL_WITH_COMPOSED_KEY));
        }
        return condidatRepository.findAll(genericSpesification);
    }

    @Override
    public List<Condidat> getAll() {
        return condidatRepository.findAll();
    }


}
