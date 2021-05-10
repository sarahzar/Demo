package tn.esprit.esponline.persistence.entities;



import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class ExperienceEnseignant extends ExperienceProfessionel {

    @ManyToOne
    private Module moduleEnseigne;



    public ExperienceEnseignant(){}
    public ExperienceEnseignant(Date dateDebut, Date dateFin, Poste poste, Etablissement etablissement, Module moduleEnseigne, Condidat condidat) {
        super(dateDebut, dateFin, poste, etablissement,condidat);
        this.moduleEnseigne = moduleEnseigne;
    }

    public Module getModuleEnseigne() {
        return moduleEnseigne;
    }

    public void setModuleEnseigne(Module moduleEnseigne) {
        this.moduleEnseigne = moduleEnseigne;
    }
}
