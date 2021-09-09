package tn.esprit.esponline.persistence.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Parcour {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int annee;
    private int mention;
    //assosiations
    @ManyToOne
    private Diplome diplome;
    @ManyToOne
    private Etablissement etablissement;
    @ManyToOne
    private Specialite specialite;
    @ManyToOne
    private Pays pays;
    @JsonIgnore
    @ManyToOne
    private Condidat condidat;

    public Parcour() {
    }

    public Parcour(Diplome diplome, Etablissement etablissement, Specialite specialite, Condidat condidat, int annee, Pays pays, int mention) {
        this.diplome = diplome;
        this.etablissement = etablissement;
        this.specialite = specialite;
        this.condidat=condidat;
        this.annee=annee;
        this.pays=pays;
        this.mention=mention;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public int getMention() {
        return mention;
    }

    public void setMention(int mention) {
        this.mention = mention;
    }

    public Diplome getDiplome() {
        return diplome;
    }

    public void setDiplome(Diplome diplome) {
        this.diplome = diplome;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Specialite getSpecialite() {
        return specialite;
    }

    public void setSpecialite(Specialite specialite) {
        this.specialite = specialite;
    }

    public Condidat getCondidat() {
        return condidat;
    }

    public void setCondidat(Condidat condidat) {
        this.condidat = condidat;
    }

    public Pays getPays() {
        return pays;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }
}
