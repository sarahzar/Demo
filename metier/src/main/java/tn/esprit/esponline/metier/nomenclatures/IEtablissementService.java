package tn.esprit.esponline.metier.nomenclatures;


import tn.esprit.esponline.persistence.entities.Etablissement;

public interface IEtablissementService extends InterfaceCrud<Etablissement> {

    public Etablissement getByLibelle(String libelle);

    public void addEtablissement(Etablissement etablissement);

}
