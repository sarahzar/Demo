package tn.esprit.esponline.api.DTO;

public class RechercheDTO {

    private String thematiqueDesciption;
    private int chapitreLivre;
    private int articleJornaux;
    private int articleConference;
    private int pfe;
    private int mastere;
    private int these;

    public String getThematiqueDesciption() {
        return thematiqueDesciption;
    }

    public void setThematiqueDesciption(String thematiqueDesciption) {
        this.thematiqueDesciption = thematiqueDesciption;
    }

    public int getChapitreLivre() {
        return chapitreLivre;
    }

    public void setChapitreLivre(int chapitreLivre) {
        this.chapitreLivre = chapitreLivre;
    }

    public int getArticleJornaux() {
        return articleJornaux;
    }

    public void setArticleJornaux(int articleJornaux) {
        this.articleJornaux = articleJornaux;
    }

    public int getArticleConference() {
        return articleConference;
    }

    public void setArticleConference(int articleConference) {
        this.articleConference = articleConference;
    }

    public int getPfe() {
        return pfe;
    }

    public void setPfe(int pfe) {
        this.pfe = pfe;
    }

    public int getMastere() {
        return mastere;
    }

    public void setMastere(int mastere) {
        this.mastere = mastere;
    }

    public int getThese() {
        return these;
    }

    public void setThese(int these) {
        this.these = these;
    }
}
