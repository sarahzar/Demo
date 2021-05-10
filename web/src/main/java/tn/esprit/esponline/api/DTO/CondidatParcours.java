package tn.esprit.esponline.api.DTO;

import java.util.List;

public class CondidatParcours {
    private List<ParcoursDTO> listeParcours;

    public CondidatParcours() {
    }

    public List<ParcoursDTO> getListeParcours() {
        return listeParcours;
    }

    public void setListeParcours(List<ParcoursDTO> listeParcours) {
        this.listeParcours = listeParcours;
    }
}
