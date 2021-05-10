package tn.esprit.esponline.api.DTO;

import java.util.Date;

public class ExperienceEnseignantDTO {

    private Date dateDebut;
    private Date dateFin;
    private int posteId;
    private int etablissementId;
    private int moduleId;

    public ExperienceEnseignantDTO() {
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public int getPosteId() {
        return posteId;
    }

    public void setPosteId(int posteId) {
        this.posteId = posteId;
    }

    public int getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(int etablissementId) {
        this.etablissementId = etablissementId;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }
}
