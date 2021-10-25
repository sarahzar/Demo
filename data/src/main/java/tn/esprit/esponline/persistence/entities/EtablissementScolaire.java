package tn.esprit.esponline.persistence.entities;


import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("ETABLISSEMENT_SCOLAIRE")
public class EtablissementScolaire extends Etablissement{

    private String telephone;
    private String mail;

    public EtablissementScolaire(){}

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
