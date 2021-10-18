package tn.esprit.esponline.persistence.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Recherche {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int chapitreLivre;
    private int articleJornaux;
    private int articleConference;
    private int pfe;
    private int mastere;
    private int these;
    @OneToOne(cascade = CascadeType.ALL)
    private Thematique thematique;
    @JsonIgnore
    @ManyToOne
    private Condidat condidat;

    public Recherche() {
    }

    public Recherche(int chapitreLivre, int articleJornaux, int articleConference, int pfe, int mastere, int these, Thematique thematique, Condidat condidat) {
        this.chapitreLivre = chapitreLivre;
        this.articleJornaux = articleJornaux;
        this.articleConference = articleConference;
        this.pfe = pfe;
        this.mastere = mastere;
        this.these = these;
        this.thematique = thematique;
        this.condidat = condidat;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Thematique getThematique() {
        return thematique;
    }

    public void setThematique(Thematique thematique) {
        this.thematique = thematique;
    }

    public Condidat getCondidat() {
        return condidat;
    }

    public void setCondidat(Condidat condidat) {
        this.condidat = condidat;
    }
}
