package tn.esprit.esponline.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DomaineReportDto {

    private String name;
    private long pourcentage;
}
