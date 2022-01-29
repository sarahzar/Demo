package tn.esprit.esponline.api.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class SearchDto {
    private String nom;
    private String prenom;
    private int annee;
    private long idDiplome;
}
