package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;
import tn.esprit.esponline.api.DTO.*;
import tn.esprit.esponline.api.utilities.Mapper;
import tn.esprit.esponline.metier.authentification.IRoleService;
import tn.esprit.esponline.metier.authentification.IUserService;
import tn.esprit.esponline.metier.condidature.ICondidatService;
import tn.esprit.esponline.metier.nomenclatures.IDiplomeService;
import tn.esprit.esponline.metier.nomenclatures.IDomaineService;
import tn.esprit.esponline.persistence.entities.*;

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
    @Autowired
    private IUserService userService;
    @Autowired
    private IRoleService roleService;


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

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UtilisateurAdminDto>> getAll(){
        int indice=0;
        List<Condidat> allUsers=condidatService.getAll();
        Mapper mapper = new Mapper();
        List<UtilisateurAdminDto>  allUsersDto= mapper.mapAll(allUsers,UtilisateurAdminDto.class);


            for(Condidat u:allUsers) {
                allUsersDto.get(indice).setRole(u.getRoles().get(0).getName());
                indice++;
            }
       return ResponseEntity.ok().body(allUsersDto);
    }

    @PostMapping("/lock/{username}/{lock}")
    public void lockUser(@PathVariable String username,@PathVariable boolean lock){
         Condidat c= this.condidatService.getCondidatByUsername(username);
         c.setActive(lock);
        this.condidatService.saveCondidat(c);
    }

    @PostMapping("/confirm/{username}/{confirm}")
    public void confirmeUser(@PathVariable String username,@PathVariable boolean confirm){
        Condidat c= this.condidatService.getCondidatByUsername(username);
        c.setaConfirmer(confirm);
        this.condidatService.saveCondidat(c);
    }

    @DeleteMapping("/delete/{username}")
    public void deleteUser(@PathVariable String username){
        Utilisateur u= this.userService.getUsrConnected(username);
        u.setRoles(null);
        this.userService.delete(u);
    }

    @PostMapping("/affecte/{username}/{roleName}")
    public ResponseEntity<ResponseDto> affecteRoleToUser(@PathVariable String username,@PathVariable String roleName){
        ResponseDto resp=new ResponseDto();
        int res=userService.affectRoleToUser(roleName,username);
        if(res == 1){
            resp.setSuccesMessage("le role "+roleName+" est affecté à l'utilisateur "+username+" avec succès!");
        }else{
            resp.setErrorMessage("le role "+roleName+" ne peut pas être  affecter à l'utilisateur "+username+", veuillez vérifier le nom du role ou le nom d'utilisateur!");
        }

        return ResponseEntity.ok().body(resp);
    }

    @GetMapping("/getRoles/{username}")
    public ResponseEntity<List<Role>> getUserRoles(@PathVariable String username){
        List<Role> roles=userService.getUserRoles(username);
        return ResponseEntity.ok().body(roles);
    }

    @DeleteMapping("/deleteRole/{username}/{roleName}")
    public ResponseEntity<ResponseDto> deleteUserRole(@PathVariable String username,@PathVariable String roleName){
        ResponseDto resp=new ResponseDto();
        int res=userService.deleteRoleFromUserRoles(roleName,username);
        if(res == 1){
            resp.setSuccesMessage("le role "+roleName+" est supprimé avec succès!");
        }else{
            resp.setErrorMessage("le role "+roleName+" ne peut pas être  supprimé, veuillez vérifier le nom du role ou le nom d'utilisateur!");
        }

        return ResponseEntity.ok().body(resp);
    }

    @GetMapping("/getAllRoles")
    public ResponseEntity<List<Role>> getAlloles(){
        List<Role> roles=roleService.allRoles();
        return ResponseEntity.ok().body(roles);
    }

}
