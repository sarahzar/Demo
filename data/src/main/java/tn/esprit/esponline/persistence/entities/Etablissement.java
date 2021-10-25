package tn.esprit.esponline.persistence.entities;

import javax.persistence.*;

@Entity
//@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("ETABLISSEMENT")
public class Etablissement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQUENCE_NAME")
    @SequenceGenerator(name = "SEQUENCE_NAME", sequenceName = "SEQUENCE_NAME", allocationSize = 1, initialValue = 1000)
    private  long id;
    private String libelle;
//    private int telephone;
//    private String mail;


    public Etablissement() {
    }

    public Etablissement(String libelle) {
        this.libelle = libelle;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

//    public int getTelephone() {
//        return telephone;
//    }
//
//    public void setTelephone(int telephone) {
//        this.telephone = telephone;
//    }
//
//    public String getMail() {
//        return mail;
//    }
//
//    public void setMail(String mail) {
//        this.mail = mail;
//    }
}
