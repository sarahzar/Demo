package tn.esprit.esponline.api.DTO;

import java.util.List;

public class CondidatExperiencesProfessionels {

    private List<ExperienceProfessionelDTO> condidatExperProfessionel;


    public List<ExperienceProfessionelDTO> getCondidatExperProfessionel() {
        return condidatExperProfessionel;
    }

    public void setCondidatExperProfessionel(List<ExperienceProfessionelDTO> condidatExperProfessionel) {
        this.condidatExperProfessionel = condidatExperProfessionel;
    }
}
