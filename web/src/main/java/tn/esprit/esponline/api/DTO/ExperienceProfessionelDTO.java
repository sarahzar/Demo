package tn.esprit.esponline.api.DTO;


import java.util.Date;

public class ExperienceProfessionelDTO {
    private Date dateDebut;
    private Date dateFin;
    private int paysId;
    private int etablissementId;
    private int posteId;
    private String ville;

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

    public int getPaysId() {
        return paysId;
    }

    public void setPaysId(int paysId) {
        this.paysId = paysId;
    }

    public int getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(int etablissementId) {
        this.etablissementId = etablissementId;
    }

    public int getPosteId() {
        return posteId;
    }

    public void setPosteId(int posteId) {
        this.posteId = posteId;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }
}
