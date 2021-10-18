package tn.esprit.esponline.persistence.entities;



import javax.persistence.*;
import java.util.Date;

@Entity
//@DiscriminatorColumn(name="type",discriminatorType= DiscriminatorType.STRING)
//@DiscriminatorValue(value="ExperienceEns")
public class ExperienceEnseignant extends ExperienceProfessionel {

    @ManyToOne
    private Module moduleEnseigne;



    public ExperienceEnseignant(){}


    public Module getModuleEnseigne() {
        return moduleEnseigne;
    }

    public void setModuleEnseigne(Module moduleEnseigne) {
        this.moduleEnseigne = moduleEnseigne;
    }
}
