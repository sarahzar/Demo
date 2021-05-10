package tn.esprit.esponline.persistence.entities;



import javax.persistence.*;
import java.util.Date;

@Inheritance(strategy=InheritanceType.JOINED)
@Entity
public class ExperienceProfessionel {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)

    private int id;
    private Date dateDebut;
    private Date dateFin;
    @ManyToOne
    private Poste poste;
    @ManyToOne
    private Etablissement etablissement;
    @ManyToOne
    private Pays pays;
    @ManyToOne
    private Condidat condidat;
    private String ville;

    public ExperienceProfessionel() {
    }

    public ExperienceProfessionel(Date dateDebut, Date dateFin, Poste poste, Etablissement etablissement, Pays pays, String ville, Condidat condidat) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.poste = poste;
        this.etablissement = etablissement;
        this.pays = pays;
        this.ville = ville;
        this.condidat=condidat;
    }

    public ExperienceProfessionel(Date dateDebut, Date dateFin, Poste poste, Etablissement etablissement, Condidat condidat) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.poste = poste;
        this.etablissement = etablissement;
        this.condidat=condidat;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public Poste getPoste() {
        return poste;
    }

    public void setPoste(Poste poste) {
        this.poste = poste;
    }

    public Etablissement getEtablissement() {
        return etablissement;
    }

    public void setEtablissement(Etablissement etablissement) {
        this.etablissement = etablissement;
    }

    public Pays getPays() {
        return pays;
    }

    public void setPays(Pays pays) {
        this.pays = pays;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Condidat getCondidat() {
        return condidat;
    }

    public void setCondidat(Condidat condidat) {
        this.condidat = condidat;
    }
}
