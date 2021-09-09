package tn.esprit.esponline.api.DTO;

import tn.esprit.esponline.persistence.entities.Etablissement;
import tn.esprit.esponline.persistence.entities.Poste;
import tn.esprit.esponline.persistence.entities.Module;
import java.util.Date;

public class ExperienceEnseignantDTO {

    private String dateDebut;
    private String dateFin;
    private Poste poste;
    private Etablissement etablissement;
    private Module moduleEnseigne;

    public ExperienceEnseignantDTO() {
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

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Module getModuleEnseigne() {
        return moduleEnseigne;
    }

    public void setModuleEnseigne(Module moduleEnseigne) {
        this.moduleEnseigne = moduleEnseigne;
    }
}
