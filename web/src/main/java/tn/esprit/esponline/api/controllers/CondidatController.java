package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import tn.esprit.esponline.api.DTO.ResponseDto;
import tn.esprit.esponline.api.DTO.CondidatDto;
import tn.esprit.esponline.api.utilities.enums.EDocumentType;
import tn.esprit.esponline.metier.condidature.ICondidatService;
import tn.esprit.esponline.metier.condidature.IModuleService;
import tn.esprit.esponline.metier.upload.IFilesStorageService;
import tn.esprit.esponline.persistence.entities.Module;
import tn.esprit.esponline.metier.nomenclatures.*;
import tn.esprit.esponline.persistence.entities.*;



import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
public class CondidatController {

    @Autowired
    private ICondidatService condidatService;
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
    private ISpecialiteService specialiteService;
    @Autowired
    private IEtatCivilService etatCivilService;
    @Autowired
    private IParcourService parcourService;
    @Autowired
    private IPaysService paysService;
    @Autowired
    private IModuleService moduleService;
    @Autowired
    IFilesStorageService storageService;


    @PostMapping("/saveCondidatInfos/{username}")
    public ResponseEntity<ResponseDto> saveCondidat(@RequestBody CondidatDto condidat, @PathVariable String username,@RequestBody MultipartFile[] files){


        ResponseDto response=new ResponseDto();

        EtatCivil etatCivil=etatCivilService.findById(condidat.getEtatCivilId());
        Poste poste=posteService.findById(condidat.getPosteActuelId());
        Domaine domaine=domaineService.findById(condidat.getDomaineId());
        Diplome diplome=diplomeService.findById(condidat.getDernierDiplomeId());
        Specialite specialite=specialiteService.findById(condidat.getSpecialiteId());
        Etablissement etablissement=etablissementService.findById(condidat.getEtablissementId());
        TypeCondidature typeCondidature=typeCondidatureService.findById(condidat.getTypeCondidatureId());

        try {
            Condidat condidatBd = condidatService.getCondidatByUsername(username);

            if (condidatBd != null) {
               // Parcour dernierDiplomeDb=parcourService.findById(condidatBd.getDernierDiplome().getId());
                if(condidatBd.getDernierDiplome() != null){
                    condidatBd.getDernierDiplome().setDiplome(diplome);
                    condidatBd.getDernierDiplome().setEtablissement(etablissement);
                    condidatBd.getDernierDiplome().setSpecialite(specialite);
                    condidatBd.getDernierDiplome().setAnnee(condidat.getAnneeObtention());
                    //condidatBd.setDernierDiplome(dernierDiplomeDb);
                }else {
                    Parcour dernierDiplome = new Parcour(diplome, etablissement, specialite, condidatBd,condidat.getAnneeObtention(),null,0);
                    condidatBd.setDernierDiplome(dernierDiplome);
                }
                condidatBd.setNom(condidat.getNom());
                condidatBd.setPrenom(condidat.getPrenom());
                condidatBd.setCin(condidat.getCin());
                condidatBd.setEtat(condidat.getEtat());
                condidatBd.setDateNaissance(condidat.getDateNaissance());
                condidatBd.setSexe(condidat.getSexe());
                condidatBd.setTelephone(condidat.getTelephone());

                condidatBd.setEtatCivil(etatCivil);
                condidatBd.setTypeCondidature(typeCondidature);
                condidatBd.setPosteActuel(poste);
                condidatBd.setDomaine(domaine);

                List<Parcour> parcours=new ArrayList<>();
                if(condidat.getListeParcours()!=null && !condidat.getListeParcours().isEmpty()) {
                    condidat.getListeParcours().forEach(p -> {

                        Diplome diplomeparcour = diplomeService.findById(p.getDiplomeId());
                        Etablissement etablissementparcour=etablissementService.findById(p.getEtablissementId());
                        Specialite specialiteparcour=specialiteService.findById(p.getSpecialiteId());
                        Pays pays= paysService.findById(p.getPaysId());
                        Parcour parcour = new Parcour(diplomeparcour,etablissementparcour,specialiteparcour,condidatBd,p.getAnneeObtention(),pays,p.getMention());
                        parcours.add(parcour);
                    });
                    condidatBd.setParcourScolaire(parcours);
                }

                List<ExperienceEnseignant> condidatListExpEnseignant = new ArrayList<>();
                if (condidat.getCondidatExperEnseignt() != null && !condidat.getCondidatExperEnseignt().isEmpty()) {
                    condidat.getCondidatExperEnseignt().forEach(exp -> {
                        Etablissement etablissementexpEns = etablissementService.findById(exp.getEtablissementId());
                        Poste posteexpEns = posteService.findById(exp.getPosteId());
                        Module module = moduleService.findById(exp.getModuleId());
                        ExperienceEnseignant experience = new ExperienceEnseignant(exp.getDateDebut(), exp.getDateFin(), posteexpEns, etablissementexpEns, module, condidatBd);
                        condidatListExpEnseignant.add(experience);
                    });
                    condidatBd.setExperienceEnseignants(condidatListExpEnseignant);
                }

                List<ExperienceProfessionel> condidatListExpPro = new ArrayList<>();

                if (condidat.getCondidatExperProfessionel() != null && !condidat.getCondidatExperProfessionel().isEmpty()) {
                    condidat.getCondidatExperProfessionel().forEach(exp -> {
                        Etablissement etablissementexpPro = etablissementService.findById(exp.getEtablissementId());
                        Poste posteexpPro = posteService.findById(exp.getPosteId());
                        Pays pays=paysService.findById(exp.getPaysId());
                        ExperienceProfessionel experience=new ExperienceProfessionel(exp.getDateDebut(), exp.getDateFin(), posteexpPro, etablissementexpPro, pays, exp.getVille(),condidatBd);
                        condidatListExpPro.add(experience);
                    });
                    condidatBd.setExperienceProfessionels(condidatListExpPro);
                }

                List<Competence> listCompetences = new ArrayList<>();

                if (condidat.getCompetences() != null && !condidat.getCompetences().isEmpty()) {
                    condidat.getCompetences().forEach(cpt -> {
                       Competence competence=new Competence(cpt.getTitre(),cpt.getDescription(),condidatBd);
                        listCompetences.add(cpt);
                    });
                    condidatBd.setCompetences(listCompetences);
                }

                List<Recherche> recherchesList= new ArrayList<>();

                if (condidat.getRecherches() != null && !condidat.getRecherches().isEmpty()) {
                    condidat.getRecherches().forEach(r -> {
                        Thematique thematique=new Thematique(r.getThematiqueDesciption());
                        Recherche recherche=new Recherche(r.getChapitreLivre(),r.getArticleJornaux(),r.getArticleConference(),r.getPfe(),r.getMastere(),r.getThese(),thematique,condidatBd);
                        recherchesList.add(recherche);
                    });
                    condidatBd.setRecherches(recherchesList);
                }

                List<Document> documentsList=new ArrayList<>();
                if (condidat.getDocuments() != null && !condidat.getDocuments().isEmpty()) {
                    condidat.getDocuments().forEach(d -> {
                        MultipartFile file=d.getFile();

                          try {
                              storageService.save(file);
                              Document document=null;
                              if(d.getId() == EDocumentType.Cv.getId()){
                              document=new Document(file.getOriginalFilename(),EDocumentType.Cv.getLibelle(),condidatBd);
                              }else if(d.getId() == EDocumentType.PHOTO.getId()){
                              document=new Document(file.getOriginalFilename(),EDocumentType.PHOTO.getLibelle(),condidatBd);
                              }else if(d.getId() == EDocumentType.LM.getId()){
                              document=new Document(file.getOriginalFilename(),EDocumentType.LM.getLibelle(),condidatBd);
                              }else if(d.getId() == EDocumentType.DIPLOME.getId()){
                               document=new Document(file.getOriginalFilename(),EDocumentType.DIPLOME.getLibelle(),condidatBd);
                              }else if(d.getId() == EDocumentType.ANNEXE.getId()){
                               document=new Document(file.getOriginalFilename(),EDocumentType.ANNEXE.getLibelle(),condidatBd);
                              }
                              documentsList.add(document);
                          }catch (Exception e) {
                              String message = "Could not upload the file: " + file.getOriginalFilename() + e.getMessage()+" !";
                              response.setErrorMessage(message);
                          }

                    });
                    condidatBd.setDocuments(documentsList);
                }

                //    condidatBd.setDateInscrit(condidat.getDateInscrit());
                //   condidatBd.setaConfirmer(condidat.isaConfirmer());
                //    condidatBd.setDateModif(condidat.getDateModif());
                //  condidatBd.setDemandeModif(condidat.isDemandeModif());

                condidatService.saveCondidat(condidatBd);
            }
        }catch (Exception e){
            response.setErrorMessage("Erreur d'enregistrement!");
            return ResponseEntity.ok().body(response);
        }
        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
        return ResponseEntity.ok().body(response);
    }

  //  @PostMapping("/addListParcours/{username}")
//    public ResponseEntity<ResponseDto> addListParcours(@PathVariable String username,@RequestBody CondidatParcours parcoursCondidat){
//        ResponseDto response=new ResponseDto();
//        try {
//         Condidat condidatBd = condidatService.getCondidatByUsername(username);
//        List<Parcour> parcours=new ArrayList<>();
//        if(parcoursCondidat.getListeParcours()!=null && !parcoursCondidat.getListeParcours().isEmpty()) {
//            parcoursCondidat.getListeParcours().forEach(p -> {
//
//                Diplome diplome = diplomeService.findById(p.getDiplomeId());
//                Etablissement etablissement=etablissementService.findById(p.getEtablissementId());
//                Specialite specialite=specialiteService.findById(p.getSpecialiteId());
//                Pays pays= paysService.findById(p.getPaysId());
//                Parcour parcour = new Parcour(diplome,etablissement,specialite,condidatBd,p.getAnneeObtention(),pays,p.getMention());
//                parcours.add(parcour);
//            });
//        }
//
//        if(condidatBd != null){
//            condidatBd.setParcourScolaire(parcours);
//            condidatService.saveCondidat(condidatBd);
//        }
//        }catch (Exception e){
//            response.setErrorMessage("Erreur d'enregistrement!");
//            return ResponseEntity.ok().body(response);
//        }
//        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
//        return ResponseEntity.ok().body(response);
//    }
//    @PostMapping("/addExperienceEnseignant/{username}")
//    public ResponseEntity<ResponseDto> addExperienceEnseignant(@PathVariable String username ,@RequestBody CondidatExperiencesEnseignant expEnseignant){
//        ResponseDto response=new ResponseDto();
//        try {
//            Condidat condidatBd = condidatService.getCondidatByUsername(username);
//            List<ExperienceEnseignant> condidatListExpEnseignant = new ArrayList<>();
//
//            if (expEnseignant.getCondidatExperEnseignt() != null && !expEnseignant.getCondidatExperEnseignt().isEmpty()) {
//                expEnseignant.getCondidatExperEnseignt().forEach(exp -> {
//                    Etablissement etablissement = etablissementService.findById(exp.getEtablissementId());
//                    Poste poste = posteService.findById(exp.getPosteId());
//                    Module module = moduleService.findById(exp.getModuleId());
//                    ExperienceEnseignant experience = new ExperienceEnseignant(exp.getDateDebut(), exp.getDateFin(), poste, etablissement, module, condidatBd);
//                    condidatListExpEnseignant.add(experience);
//                });
//            }
//            if (condidatBd != null) {
//                condidatBd.setExperienceEnseignants(condidatListExpEnseignant);
//                condidatService.saveCondidat(condidatBd);
//            }
//        }catch (Exception e){
//            response.setErrorMessage("Erreur d'enregistrement!");
//            return ResponseEntity.ok().body(response);
//        }
//        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
//        return ResponseEntity.ok().body(response);
//    }
//    @PostMapping("/addExperienceProfessionel/{username}")
//    public ResponseEntity<ResponseDto> addExperienceProfessionelt(@PathVariable String username ,@RequestBody CondidatExperiencesProfessionels expProfessionel){
//        ResponseDto response=new ResponseDto();
//        try {
//            Condidat condidatBd = condidatService.getCondidatByUsername(username);
//            List<ExperienceProfessionel> condidatListExpPro = new ArrayList<>();
//
//            if (expProfessionel.getCondidatExperProfessionel() != null && !expProfessionel.getCondidatExperProfessionel().isEmpty()) {
//                expProfessionel.getCondidatExperProfessionel().forEach(exp -> {
//                    Etablissement etablissement = etablissementService.findById(exp.getEtablissementId());
//                    Poste poste = posteService.findById(exp.getPosteId());
//                    Pays pays=paysService.findById(exp.getPaysId());
//                   ExperienceProfessionel experience=new ExperienceProfessionel(exp.getDateDebut(), exp.getDateFin(), poste, etablissement, pays, exp.getVille(),condidatBd);
//                    condidatListExpPro.add(experience);
//                });
//            }
//            if (condidatBd != null) {
//                condidatBd.setExperienceProfessionels(condidatListExpPro);
//                condidatService.saveCondidat(condidatBd);
//            }
//        }catch (Exception e){
//            response.setErrorMessage("Erreur d'enregistrement!");
//            return ResponseEntity.ok().body(response);
//        }
//        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
//        return ResponseEntity.ok().body(response);
//    }
}
