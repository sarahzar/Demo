package tn.esprit.esponline.metier.condidature;


import tn.esprit.esponline.persistence.entities.Condidat;

public interface ICondidatService  {

    public Condidat getCondidatByUsername(String username);
    public  void  saveCondidat(Condidat condidat);
}
