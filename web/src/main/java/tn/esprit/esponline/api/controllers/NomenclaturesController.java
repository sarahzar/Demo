package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.esponline.metier.condidature.IModuleService;
import tn.esprit.esponline.persistence.entities.Module;
import tn.esprit.esponline.metier.nomenclatures.*;
import tn.esprit.esponline.persistence.entities.*;



import java.sql.SQLException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/private")
public class NomenclaturesController {

    @Autowired
    private IPosteService posteService;
    @Autowired
    private ITypeCondidatureService typeCondidatureService;
    @Autowired
    private IDiplomeService diplomeService;
    @Autowired
    private IDomaineService domaineService;
    @Autowired
    private IEtablissementService etablissementService;
    @Autowired
    private IEtablissementScolaireService etablissementScolaireService;
    @Autowired
    private ISpecialiteService specialiteService;
    @Autowired
    private IEtatCivilService etatCivilService;
    @Autowired
    private IPaysService paysService;
    @Autowired
    private IModuleService moduleService;


    @GetMapping("/allPostes")
    public ResponseEntity<List<Poste>> getAllPoste(){
        List<Poste> postes=null;
        try {
            postes=posteService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
       return ResponseEntity.ok().body(postes);
    }

    @GetMapping("/allCandidaturesTypes")
    public ResponseEntity<List<TypeCondidature>> getAllCondidatures(){
        List<TypeCondidature> typesCondidatures=null;
        try {
            typesCondidatures=typeCondidatureService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(typesCondidatures);
    }

    @GetMapping("/allDiplomes")
    public ResponseEntity<List<Diplome>> getallDiplomes(){
        List<Diplome> allDiplomes=null;
        try {
            allDiplomes=diplomeService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allDiplomes);
    }

    @GetMapping("/allDomaines")
    public ResponseEntity<List<Domaine>> getallDomaines(){
        List<Domaine> allDomaines=null;
        try {
            allDomaines=domaineService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allDomaines);
    }

    @GetMapping("/allEtablissement")
    public ResponseEntity<List<EtablissementScolaire>> getallEtablissement(){
        List<EtablissementScolaire> allEtablissement=null;
        try {
            allEtablissement=etablissementScolaireService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allEtablissement);
    }

    @GetMapping("/allSpecialite")
    public ResponseEntity<List<Specialite>> getallSpecialite(){
        List<Specialite> allSpecialite=null;
        try {
            allSpecialite=specialiteService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allSpecialite);
    }

    @GetMapping("/allEtatCivil")
    public ResponseEntity<List<EtatCivil>> getallEtatCivil(){
        List<EtatCivil> allEtatCivil=null;
        try {
            allEtatCivil=etatCivilService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allEtatCivil);
    }

    @GetMapping("/allModules")
    public ResponseEntity<List<Module>> getallModules(){
        List<Module> allModules=null;
        try {
            allModules=moduleService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allModules);
    }
    @GetMapping("/allPays")
    public ResponseEntity<List<Pays>> allPays(){
        List<Pays> allPays=null;
        try {
            allPays=paysService.getAll();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return ResponseEntity.ok().body(allPays);
    }
}
