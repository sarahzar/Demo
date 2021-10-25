package tn.esprit.esponline.persistence.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Parcour {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int annee;
    private int mention;
    //assosiations
    @ManyToOne
    private Diplome diplome;
    @ManyToOne
    private EtablissementScolaire etablissement;
    @ManyToOne
    private Specialite specialite;
    @ManyToOne
    private Pays pays;
    @JsonIgnore
    @ManyToOne
    private Condidat condidat;

    public Parcour() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public EtablissementScolaire getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(EtablissementScolaire etablissement) {
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
