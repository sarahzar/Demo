package tn.esprit.esponline.persistence.entities;

import javax.persistence.Embeddable;

@Embeddable
public class Adresse {

    private int numRue;
    private String rue;
    private String ville;
    private int codePostal;

    public Adresse(int numRue, String rue, String ville, int codePostal) {
        this.numRue = numRue;
        this.rue = rue;
        this.ville = ville;
        this.codePostal = codePostal;
    }
    public Adresse(){}

    public int getNumRue() {
        return numRue;
    }

    public void setNumRue(int numRue) {
        this.numRue = numRue;
    }

    public String getRue() {
        return rue;
    }

    public void setRue(String rue) {
        this.rue = rue;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public int getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(int codePostal) {
        this.codePostal = codePostal;
    }
}
