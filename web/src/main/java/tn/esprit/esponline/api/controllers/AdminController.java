package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;
import tn.esprit.esponline.api.DTO.*;
import tn.esprit.esponline.api.utilities.Mapper;
import tn.esprit.esponline.metier.condidature.ICondidatService;
import tn.esprit.esponline.metier.nomenclatures.IDiplomeService;
import tn.esprit.esponline.metier.nomenclatures.IDomaineService;
import tn.esprit.esponline.persistence.entities.Condidat;
import tn.esprit.esponline.persistence.entities.Diplome;
import tn.esprit.esponline.persistence.entities.Domaine;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/private")
public class AdminController {

    @Autowired
    private ICondidatService condidatService;
    @Autowired
    private IDomaineService domaineService;
    @Autowired
    private IDiplomeService diplomeService;


    @GetMapping("/getReport")
    public ResponseEntity<ReportDto> getReport() throws SQLException {
        List<DomaineReportDto> domaineReport=new ArrayList<>();
        List<DiplomeReport> diplomeReports=new ArrayList<>();

        long countAll=condidatService.countAll();
        long countFemmes=condidatService.countFemmes("femme");
        long countDocteurs=condidatService.countDocteurs();
        long countConfirmes=condidatService.CountConfirme();

        List<Domaine> domainesList=domaineService.getAll();
        Map<String,Long> countByDomaine=condidatService.countByDomaines(domainesList);

        for(Map.Entry<String,Long> entries: countByDomaine.entrySet()){
            double pr=(double)entries.getValue()/countAll;
            long res=Math.round(pr*100);
            DomaineReportDto dr=new DomaineReportDto(entries.getKey(),res);
            domaineReport.add(dr);
        }

        List<Diplome> diplomesListe=diplomeService.getAll();
        Map<String,Long> countByDiplomes=condidatService.countByDiplome(diplomesListe);

        for(Map.Entry<String,Long> entries: countByDiplomes.entrySet()){
            DiplomeReport dr=new DiplomeReport(entries.getKey(),entries.getValue());
            diplomeReports.add(dr);
        }
        ReportDto report =new ReportDto(countAll,countFemmes,countDocteurs,countConfirmes,domaineReport,diplomeReports);

         return ResponseEntity.ok().body(report);


    }

    @PostMapping("/getCondidats")
    public ResponseEntity<List<CondidatDto>> getCondidats(@RequestBody SearchDto searchDto){


        List<Condidat> condidats=condidatService.getBySpecificCriteria(searchDto.getNom(),searchDto.getPrenom(),searchDto.getIdDiplome());
        if(searchDto.getAnnee() > 0) {
            condidats = condidats.stream().filter(c -> {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(c.getDateInscrit());
                if (calendar.get(Calendar.YEAR) == searchDto.getAnnee()) {
                    return true;
                }
                return false;
            }).collect(Collectors.toList());
        }

        Mapper mapper = new Mapper();
        List<CondidatDto> condidatDtoList=mapper.mapAll(condidats,CondidatDto.class);
        return ResponseEntity.ok().body(condidatDtoList);
    }

}
