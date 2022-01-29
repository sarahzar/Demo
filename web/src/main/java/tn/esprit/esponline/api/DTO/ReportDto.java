package tn.esprit.esponline.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor
public class ReportDto {

    private long totalCount;
    private long femmesCount;
    private long docteursCount;
    private long confirmeCount;
    private List<DomaineReportDto> domaineReport;
    private List<DiplomeReport> diplomeReports;
}
