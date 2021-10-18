package tn.esprit.esponline.metier.nomenclatures;


import tn.esprit.esponline.persistence.entities.Parcour;

public interface IParcourService extends InterfaceCrud<Parcour> {

    public Parcour findByCondidat_Id(int id);
    public void deleteById(long id);
}
