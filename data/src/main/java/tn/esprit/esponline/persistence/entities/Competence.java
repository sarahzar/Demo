package tn.esprit.esponline.persistence.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Competence {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String titre;
    private String description;
    @JsonIgnore
    @ManyToOne
    private Condidat condidat;

    public Competence(){}

    public Competence(String titre, String description, Condidat condidat) {
        this.titre = titre;
        this.description = description;
        this.condidat = condidat;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Condidat getCondidat() {
        return condidat;
    }

    public void setCondidat(Condidat condidat) {
        this.condidat = condidat;
    }
}
