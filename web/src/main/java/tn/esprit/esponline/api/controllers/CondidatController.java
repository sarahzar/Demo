package tn.esprit.esponline.api.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import tn.esprit.esponline.api.DTO.*;
import tn.esprit.esponline.api.utilities.Mapper;
import tn.esprit.esponline.api.utilities.enums.EDocumentType;
import tn.esprit.esponline.metier.condidature.ICondidatService;
import tn.esprit.esponline.metier.condidature.IModuleService;
import tn.esprit.esponline.metier.upload.FileExistException;
import tn.esprit.esponline.metier.upload.IFilesStorageService;
import tn.esprit.esponline.persistence.entities.Module;
import tn.esprit.esponline.metier.nomenclatures.*;
import tn.esprit.esponline.persistence.entities.*;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<ResponseDto> saveCondidat(@PathVariable String username,@RequestParam("file") MultipartFile[] files,@RequestParam("condidat") String cdt) throws JsonProcessingException {

        ResponseDto response=new ResponseDto();

        Mapper mapper = new Mapper();
        CondidatDto condidat = new ObjectMapper().readValue(cdt, CondidatDto.class);
//        EtatCivil etatCivil=etatCivilService.findById(condidat.getEtatCivilId());
//        Poste poste=posteService.findById(condidat.getPosteActuelId());
//        Domaine domaine=domaineService.findById(condidat.getDomaineId());
//        Diplome diplome=diplomeService.findById(condidat.getDernierDiplomeId());
//        Specialite specialite=specialiteService.findById(condidat.getSpecialiteId());
//        Etablissement etablissement=etablissementService.findById(condidat.getEtablissementId());
//        TypeCondidature typeCondidature=typeCondidatureService.findById(condidat.getTypeCondidatureId());

        try {
            Condidat condidatBd = condidatService.getCondidatByUsername(username);

            if (condidatBd != null) {
                condidatBd.setDernierDiplome(condidat.getDernierDiplome());
               // setDernierDiplome(condidat, condidat.getd, specialite, etablissement, condidatBd);
                setInfosGenrales(condidat, condidat.getEtatCivil(), condidat.getPosteActuel(), condidat.getDomaine(), condidat.getTypeCondidature(), condidatBd);
                condidat.getParcourScolaire().forEach(p -> p.setCondidat(condidatBd));
                condidat.getCompetences().forEach(c -> c.setCondidat(condidatBd));
                condidat.getRecherches().forEach(r -> r.setCondidat(condidatBd));
                condidat.getDocuments().forEach(d -> d.setCondidat(condidatBd));
                condidatBd.setParcourScolaire(condidat.getParcourScolaire());
               // setListeParcours(condidat, condidatBd);
//                condidatBd.setExperienceEnseignants(condidat.getExperienceEnseignants());
                //setListeExpEnseignant(condidat, condidatBd);
//                condidatBd.setExperienceProfessionels(condidat.getExperienceProfessionels());
               // setListeExpPro(condidat, condidatBd);
                condidatBd.setCompetences(condidat.getCompetences());
                //setListeCompetences(condidat, condidatBd);
                condidatBd.setRecherches(condidat.getRecherches());
                //setListeRecherches(condidat, condidatBd);

                ResponseEntity<ResponseDto> responseUpload = uploadFiles(username, files, response);
                if (responseUpload != null) return responseUpload;

                condidatBd.setDocuments(condidat.getDocuments());

                List <ExperienceEnseignant> listeExpEns = mapper.mapAll(condidat.getExperienceEnseignants(), ExperienceEnseignant.class);
                List <ExperienceProfessionel> listeExpPro = mapper.mapAll(condidat.getExperienceProfessionels(), ExperienceProfessionel.class);

                listeExpEns.forEach(expPro -> expPro.setCondidat(condidatBd));
                listeExpPro.forEach(expEns -> expEns.setCondidat(condidatBd));
                condidatBd.setExperienceProfessionels(listeExpPro);
                condidatBd.setExperienceEnseignants(listeExpEns);
               // setDocuments(condidat, condidatBd);

                condidatBd.setDateInscrit(new Date());
                condidatBd.setaConfirmer(condidat.isaConfirmer());
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

//    private void setDocuments(CondidatDto condidat, Condidat condidatBd) {
//        List<Document> documentsList=new ArrayList<>();
//        if (condidat.getDocuments() != null && !condidat.getDocuments().isEmpty()) {
//            condidat.getDocuments().forEach(d -> {
//                      Document document=new Document(d.getFileName(),d.getType(), condidatBd);
//                      documentsList.add(document);
//            });
//            condidatBd.setDocuments(documentsList);
//        }
//    }


    private ResponseEntity<ResponseDto> uploadFiles(String username, MultipartFile[] files, ResponseDto response) {
        if(files.length > 0){
            //storageService.deleteAll();
            storageService.init(username);
            for(MultipartFile file: files){
                String message = "";
                try {
                    storageService.save(file,username);
                } catch (Exception e) {
                    message = "Erreur d'importation du fichier " + file.getOriginalFilename() +": "+ e.getMessage()+" !";
                    response.setErrorMessage(message);
                    return ResponseEntity.ok().body(response);
                }
            }
        }
        return null;
    }

//    private void setListeRecherches(CondidatDto condidat, Condidat condidatBd) {
//        List<Recherche> recherchesList= new ArrayList<>();
//
//        if (condidat.getRecherches() != null && !condidat.getRecherches().isEmpty()) {
//            condidat.getRecherches().forEach(r -> {
//                Thematique thematique=new Thematique(r.getThematiqueDesciption());
//                Recherche recherche=new Recherche(r.getChapitreLivre(),r.getArticleJornaux(),r.getArticleConference(),0,r.getMastere(),r.getThese(),thematique, condidatBd);
//                recherchesList.add(recherche);
//            });
//            condidatBd.setRecherches(recherchesList);
//        }
//    }

  /*  private void setListeCompetences(CondidatDto condidat, Condidat condidatBd) {
        List<Competence> listCompetences = new ArrayList<>();

        if (condidat.getCompetences() != null && !condidat.getCompetences().isEmpty()) {
            condidat.getCompetences().forEach(cpt -> {
               Competence competence=new Competence(cpt.getTitre(),cpt.getDescription(), condidatBd);
                listCompetences.add(cpt);
            });
            condidatBd.setCompetences(listCompetences);
        }
    }*/

//    private void setListeExpPro(CondidatDto condidat, Condidat condidatBd) {
//        List<ExperienceProfessionel> condidatListExpPro = new ArrayList<>();
//        if (condidat.getCondidatExperProfessionel() != null && !condidat.getCondidatExperProfessionel().isEmpty()) {
//            condidat.getCondidatExperProfessionel().forEach(exp -> {
//                Etablissement etablissementexpPro = etablissementService.findById(exp.getEtablissementId());
//                Poste posteexpPro = posteService.findById(exp.getPosteId());
//                Pays pays=paysService.findById(exp.getPaysId());
//                ExperienceProfessionel experience=new ExperienceProfessionel(exp.getDateDebut(), exp.getDateFin(), posteexpPro, etablissementexpPro, pays, exp.getVille(), condidatBd);
//                condidatListExpPro.add(experience);
//            });
//            condidatBd.setExperienceProfessionels(condidatListExpPro);
//        }
//    }

//    private void setListeExpEnseignant(CondidatDto condidat, Condidat condidatBd) {
//        List<ExperienceEnseignant> condidatListExpEnseignant = new ArrayList<>();
//        if (condidat.getCondidatExperEnseignt() != null && !condidat.getCondidatExperEnseignt().isEmpty()) {
//            condidat.getCondidatExperEnseignt().forEach(exp -> {
//                Etablissement etablissementexpEns = etablissementService.findById(exp.getEtablissementId());
//                Poste posteexpEns = posteService.findById(exp.getPosteId());
//                Module module = moduleService.findById(exp.getModuleId());
//                ExperienceEnseignant experience = new ExperienceEnseignant(exp.getDateDebut(), exp.getDateFin(), posteexpEns, etablissementexpEns, module, condidatBd);
//                condidatListExpEnseignant.add(experience);
//            });
//            condidatBd.setExperienceEnseignants(condidatListExpEnseignant);
//        }
//    }

//    private void setListeParcours(CondidatDto condidat, Condidat condidatBd) {
//        List<Parcour> parcours=new ArrayList<>();
//        if(condidat.getListeParcours()!=null && !condidat.getListeParcours().isEmpty()) {
//            condidat.getListeParcours().forEach(p -> {
//
//                Diplome diplomeparcour = diplomeService.findById(p.getDiplomeId());
//                Etablissement etablissementparcour=etablissementService.findById(p.getEtablissementId());
//                Specialite specialiteparcour=specialiteService.findById(p.getSpecialiteId());
//                Pays pays= paysService.findById(p.getPaysId());
//                Parcour parcour = new Parcour(diplomeparcour,etablissementparcour,specialiteparcour, condidatBd,p.getAnneeObtention(),pays,p.getMention());
//                parcours.add(parcour);
//            });
//            condidatBd.setParcourScolaire(parcours);
//        }
//    }

    private void setInfosGenrales(CondidatDto condidat, EtatCivil etatCivil, Poste poste, Domaine domaine, TypeCondidature typeCondidature, Condidat condidatBd) {
        String pattern = "yyyy-MM-dd";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);

        condidatBd.setNom(condidat.getNom());
        condidatBd.setPrenom(condidat.getPrenom());
        condidatBd.setCin(condidat.getCin());
        condidatBd.setEtat(condidat.getEtat());
        try {
            condidatBd.setDateNaissance(dateFormat.parse(condidat.getDateNaissance()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        condidatBd.setSexe(condidat.getSexe());
        condidatBd.setTelephone(condidat.getTelephone());

        condidatBd.setEtatCivil(etatCivil);
        condidatBd.setTypeCondidature(typeCondidature);
        condidatBd.setPosteActuel(poste);
        condidatBd.setDomaine(domaine);

    }

//    private void setDernierDiplome(CondidatDto condidat, Diplome diplome, Specialite specialite, Etablissement etablissement, Condidat condidatBd) {
//        // Parcour dernierDiplomeDb=parcourService.findById(condidatBd.getDernierDiplome().getId());
//        if(condidatBd.getDernierDiplome() != null){
//            condidatBd.getDernierDiplome().setDiplome(diplome);
//            condidatBd.getDernierDiplome().setEtablissement(etablissement);
//            condidatBd.getDernierDiplome().setSpecialite(specialite);
//            condidatBd.getDernierDiplome().setAnnee(condidat.getAnneeObtention());
//            //condidatBd.setDernierDiplome(dernierDiplomeDb);
//        }else {
//            Parcour dernierDiplome = new Parcour(diplome, etablissement, specialite, condidatBd, condidat.getAnneeObtention(),null,0);
//            condidatBd.setDernierDiplome(dernierDiplome);
//        }
//    }
   @GetMapping(value = "/getCondidat/{username}")
   public ResponseEntity<CondidatDto> getCondidat(@PathVariable String username){
       Condidat condidat = null;
       List<ExperienceEnseignant>  expEns=new ArrayList<>();
       List<ExperienceProfessionel>  expPro=new ArrayList<>();
       List<Parcour>  parcours=new ArrayList<>();
       CondidatDto dto =null;

       try {
            condidat=condidatService.getCondidatByUsername(username);
            if(condidat != null) {
                String pattern = "yyyy-MM-dd";
                SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
                String dateNaiss = condidat.getDateNaissance() != null ? dateFormat.format(condidat.getDateNaissance()) : null;


                ModelMapper modelMapper = new ModelMapper();


                if (condidat != null && condidat.getExperienceProfessionels() != null && !condidat.getExperienceProfessionels().isEmpty()) {
                    condidat.getExperienceProfessionels().stream().
                            filter(c -> c instanceof ExperienceEnseignant)
                            .forEach(c -> expEns.add((ExperienceEnseignant) c));

                    condidat.getExperienceProfessionels().stream().
                            filter(c -> c.getClass() == ExperienceProfessionel.class)
                            .forEach(c -> expPro.add(c));
                    condidat.setExperienceEnseignants(expEns);
                    condidat.setExperienceProfessionels(expPro);
                }
                if (condidat != null && condidat.getParcourScolaire() != null) {
                    Condidat cdt = condidat;
                    condidat.getParcourScolaire().stream().
                            filter(p -> cdt.getDernierDiplome().getId() != p.getId())
                            .forEach(p -> parcours.add(p));
                    condidat.setParcourScolaire(parcours);
                }
                dto = modelMapper.map(condidat, CondidatDto.class);
                dto.setDateNaissance(dateNaiss);

                List<ExperienceEnseignantDTO> expEnsList = dto.getExperienceEnseignants() != null && !dto.getExperienceEnseignants().isEmpty() ? dto.getExperienceEnseignants().stream()
                        .peek(exp -> {
                            Date deb = null;
                            Date fin = null;
                            try {
                                deb = dateFormat.parse(exp.getDateDebut());
                                fin = dateFormat.parse(exp.getDateFin());
                            } catch (ParseException e) {
                                e.printStackTrace();
                            }

                            exp.setDateDebut(dateFormat.format(deb));
                            exp.setDateFin(dateFormat.format(fin));
                        })
                        .collect(Collectors.toList()) : null;
                List<ExperienceProfessionelDTO> expProList = dto.getExperienceProfessionels() != null && !dto.getExperienceProfessionels().isEmpty() ? dto.getExperienceProfessionels().stream()
                        .peek(exp -> {
                            Date deb = null;
                            Date fin = null;
                            try {
                                deb = dateFormat.parse(exp.getDateDebut());
                                fin = dateFormat.parse(exp.getDateFin());
                            } catch (ParseException e) {
                                e.printStackTrace();
                            }
                            exp.setDateDebut(dateFormat.format(deb));
                            exp.setDateFin(dateFormat.format(fin));
                        })
                        .collect(Collectors.toList()) : null;

                dto.setExperienceEnseignants(expEnsList);
                dto.setExperienceProfessionels(expProList);
            }
        }catch (Exception ex){
            return ResponseEntity.status(500).body(null);
        }
       return ResponseEntity.ok().body(dto);
   }

   @PostMapping(value="/confirmer/{username}")
   public ResponseEntity<ResponseDto> confirmerCondidature(@PathVariable  String username){
        ResponseDto response=new ResponseDto();
        try {
            Condidat condidatBd = condidatService.getCondidatByUsername(username);
            condidatBd.setaConfirmer(true);
            condidatService.saveCondidat(condidatBd);
            response.setSuccesMessage("Votre condidature est confirmée!");
        }catch(Exception ex){
            response.setErrorMessage("Erreur de confirmation de la condidature");
            return ResponseEntity.ok().body(response);
        }
       return ResponseEntity.ok().body(response);
   }
}
