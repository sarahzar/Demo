package tn.esprit.esponline.api.DTO;

public class ParcoursDTO {
    private int anneeObtention;
    private int diplomeId;
    private int etablissementId;
    private int specialiteId;
    private int mention;
    private int paysId;


    public ParcoursDTO() {
    }

    public ParcoursDTO(int anneeObtention, int diplomeId, int etablissementId, int specialiteId, int mention, int paysId) {
        this.anneeObtention = anneeObtention;
        this.diplomeId = diplomeId;
        this.etablissementId = etablissementId;
        this.specialiteId = specialiteId;
        this.mention = mention;
        this.paysId = paysId;
    }

    public int getAnneeObtention() {
        return anneeObtention;
    }

    public void setAnneeObtention(int anneeObtention) {
        this.anneeObtention = anneeObtention;
    }

    public int getDiplomeId() {
        return diplomeId;
    }

    public void setDiplomeId(int diplomeId) {
        this.diplomeId = diplomeId;
    }

    public int getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(int etablissementId) {
        this.etablissementId = etablissementId;
    }

    public int getSpecialiteId() {
        return specialiteId;
    }

    public void setSpecialiteId(int specialiteId) {
        this.specialiteId = specialiteId;
    }

    public int getMention() {
        return mention;
    }

    public void setMention(int mention) {
        this.mention = mention;
    }

    public int getPaysId() {
        return paysId;
    }

    public void setPaysId(int paysId) {
        this.paysId = paysId;
    }
}
