package tn.esprit.esponline.api.DTO;

import java.util.List;

public class CondidatExperiencesEnseignant {

    private List<ExperienceEnseignantDTO> condidatExperEnseignt;

    public List<ExperienceEnseignantDTO> getCondidatExperEnseignt() {
        return condidatExperEnseignt;
    }

    public void setCondidatExperEnseignt(List<ExperienceEnseignantDTO> condidatExperEnseignt) {
        this.condidatExperEnseignt = condidatExperEnseignt;
    }
}
