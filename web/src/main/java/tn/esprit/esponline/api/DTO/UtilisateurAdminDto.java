package tn.esprit.esponline.api.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class UtilisateurAdminDto {

    private String username;
    private String role;
    private boolean active;
    private boolean aConfirmer;

}
