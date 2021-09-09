package tn.esprit.esponline.api.DTO;


import tn.esprit.esponline.persistence.entities.Etablissement;
import tn.esprit.esponline.persistence.entities.Pays;
import tn.esprit.esponline.persistence.entities.Poste;



public class ExperienceProfessionelDTO {
    private String dateDebut;
    private String dateFin;
    private Pays pays;
    private Etablissement etablissement;
    private Poste poste;
    private String ville;

    public ExperienceProfessionelDTO() {
    }

    public String getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(String dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
    }

    public Pays getPays() {
        return pays;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }
}
