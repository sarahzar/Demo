package tn.esprit.esponline.metier.condidature;


import tn.esprit.esponline.persistence.entities.Condidat;
import tn.esprit.esponline.persistence.entities.Diplome;
import tn.esprit.esponline.persistence.entities.Domaine;

import java.util.List;
import java.util.Map;

public interface ICondidatService  {

    public Condidat getCondidatByUsername(String username);
    public  void  saveCondidat(Condidat condidat);
    public  void  deleteCondidat(Condidat condidat);
    public long countAll();
    public long countFemmes(String sexe);
    public long countDocteurs();
    public long CountConfirme();
    public Map<String,Long> countByDomaines(List<Domaine> allDomaines);
    public Map<String,Long> countByDiplome(List<Diplome> allDiplomes);
    public List<Condidat> getBySpecificCriteria(String nom,String prenom,long idDiplome);


}
