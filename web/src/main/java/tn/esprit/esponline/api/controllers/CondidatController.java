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
import tn.esprit.esponline.api.utilities.CondidatUtilities;
import tn.esprit.esponline.api.utilities.Mapper;
import tn.esprit.esponline.api.utilities.enums.EDocumentType;
import tn.esprit.esponline.metier.authentification.IUserService;
import tn.esprit.esponline.metier.condidature.*;
import tn.esprit.esponline.metier.upload.FileExistException;
import tn.esprit.esponline.metier.upload.IFilesStorageService;
import tn.esprit.esponline.persistence.entities.Module;
import tn.esprit.esponline.metier.nomenclatures.*;
import tn.esprit.esponline.persistence.entities.*;
import tn.esprit.esponline.persistence.repositories.nomenclatures.EtablissementRepository;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/private")
public class CondidatController  {

    @Autowired
    private ICondidatService condidatService;
    @Autowired
    private IParcourService parcourService;
    @Autowired
    private IFilesStorageService storageService;
    @Autowired
    private IExperienceProService experienceProService;
    @Autowired
    private IExperienceEnsService experienceEnsService;
    @Autowired
    private ICompetenceService competenceService;
    @Autowired
    private IRechercheService rechercheService;
    @Autowired
    private IEtablissementService etablissementService;
    @Autowired
    private EtablissementRepository etablissementRepository;
    @Autowired
    private IUserService userService;

    @PostMapping("/saveCondidatInfos/{username}")
    public ResponseEntity<ResponseDto> saveCondidat(@PathVariable String username,@RequestParam("file") MultipartFile[] files,@RequestParam("condidat") String cdt) throws JsonProcessingException {

        ResponseDto response=new ResponseDto();

        Mapper mapper = new Mapper();
        CondidatDto condidat = new ObjectMapper().readValue(cdt, CondidatDto.class);

        //upload files er maj liste documents du condidat


        try {
            updateExperienceProEtablissement(condidat);

            updateExperienceEnsEtablissement(condidat);

            Condidat condidatBd = condidatService.getCondidatByUsername(username);

            if (condidatBd != null) {

                if(files !=null && files.length != 0) {
                    ResponseEntity<ResponseDto> responseUpload = uploadFiles(username, files, response,condidatBd.getDocuments());
                    if (responseUpload != null) return responseUpload;
                }


                //récupérer la liste des expériences pro et enseignant à partir de la base
                List<ExperienceProfessionel> expros= condidatBd.getExperienceProfessionels()!=null ? condidatBd.getExperienceProfessionels().stream().
                        filter(c -> c.getClass() == ExperienceProfessionel.class).collect(Collectors.toList()) : null;
                List<ExperienceEnseignant> expens=condidatBd.getExperienceEnseignants()!=null ? condidatBd.getExperienceEnseignants() : null;

                //mettre à jour la base s'il y a des élements qui sont supprimés
                CondidatUtilities.majListeBd(condidatBd.getParcourScolaire(),condidat.getParcourScolaire(),parcourService);
                CondidatUtilities.majListeBd(expens,condidat.getExperienceEnseignants(),experienceEnsService);
                CondidatUtilities.majListeBd(expros,condidat.getExperienceProfessionels(),experienceProService);
                CondidatUtilities.majListeBd(condidatBd.getCompetences(),condidat.getCompetences(),competenceService);
                CondidatUtilities.majListeBd(condidatBd.getRecherches(),condidat.getRecherches(),rechercheService);


                //mettre à jours les infos du condidat
                if(condidat.getDernierDiplome()!=null && condidat.getDernierDiplome().getAnnee() != 0
                        && condidat.getDernierDiplome().getDiplome().getId() !=-1
                        && condidat.getDernierDiplome().getEtablissement().getId()!= -1
                        && condidat.getDernierDiplome().getSpecialite().getId()!=-1
                ){
                    condidatBd.setDernierDiplome(condidat.getDernierDiplome());
                }else {
                    condidatBd.setDernierDiplome(null);
                }
                setInfosGenrales(condidat,condidatBd);

                //mettre à jour l'attribut condidat dans les différentes listes
                if(condidat.getParcourScolaire() !=null && !condidat.getParcourScolaire().isEmpty()) {
                    condidat.getParcourScolaire().forEach(p -> p.setCondidat(condidatBd));
                }
                if(condidat.getCompetences() != null && !condidat.getCompetences().isEmpty()) {
                    condidat.getCompetences().forEach(c -> c.setCondidat(condidatBd));
                }
                if(condidat.getRecherches() !=null && !condidat.getRecherches().isEmpty()) {
                    condidat.getRecherches().forEach(r -> r.setCondidat(condidatBd));
                }


                condidatBd.setParcourScolaire(condidat.getParcourScolaire());
                condidatBd.setCompetences(condidat.getCompetences());
                condidatBd.setRecherches(condidat.getRecherches());

                condidat.getDocuments().forEach(d -> d.setCondidat(condidatBd));
                condidatBd.setDocuments(condidat.getDocuments());


                //faire le mapping entre les entités et les dtos et maj les experiences du condidat
                List <ExperienceEnseignant> listeExpEns = condidat.getExperienceEnseignants()!=null && !condidat.getExperienceEnseignants().isEmpty() ?
                        mapper.mapAll(condidat.getExperienceEnseignants(), ExperienceEnseignant.class) : null;
                List <ExperienceProfessionel> listeExpPro =  condidat.getExperienceProfessionels()!= null && !condidat.getExperienceProfessionels().isEmpty() ?
                        mapper.mapAll(condidat.getExperienceProfessionels(), ExperienceProfessionel.class) : null;

                if(listeExpEns!=null) {
                    listeExpEns.forEach(expEns -> {
                        expEns.setCondidat(condidatBd);
                    });
                }
                if(listeExpPro != null) {
                    listeExpPro.forEach(expPro -> {
                        expPro.setCondidat(condidatBd);
                    });
                }

                condidatBd.setExperienceProfessionels(listeExpPro);
                condidatBd.setExperienceEnseignants(listeExpEns);



                condidatService.saveCondidat(condidatBd);
                this.storageService.deleteNotExistingFiles(condidatBd.getDocuments(),condidatBd.getUsername());
            }
        }catch (Exception e){
            response.setErrorMessage("Erreur d'enregistrement!");
            return ResponseEntity.ok().body(response);
        }
        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
        return ResponseEntity.ok().body(response);
    }

    private void updateExperienceEnsEtablissement(CondidatDto condidat) {
        if(condidat.getExperienceEnseignants() !=null && !condidat.getExperienceEnseignants().isEmpty()) {
            for (ExperienceEnseignantDTO epe : condidat.getExperienceEnseignants()) {
                Etablissement e = etablissementService.getByLibelle(epe.getEtablissement().getLibelle());
                if (e == null) {
                    this.saveEtablissement(epe.getEtablissement().getLibelle());
                    epe.setEtablissement(etablissementService.getByLibelle(epe.getEtablissement().getLibelle()));
                } else {
                    epe.setEtablissement(e);
                }
            }
        }
    }

    private void updateExperienceProEtablissement(CondidatDto condidat) {
        if(condidat.getExperienceProfessionels()!=null && !condidat.getExperienceProfessionels().isEmpty()) {
            for (ExperienceProfessionelDTO ep : condidat.getExperienceProfessionels()) {
                Etablissement e = etablissementService.getByLibelle(ep.getEtablissement().getLibelle());
                if (e == null) {
                    this.saveEtablissement(ep.getEtablissement().getLibelle());
                    ep.setEtablissement(etablissementService.getByLibelle(ep.getEtablissement().getLibelle()));
                } else {
                    ep.setEtablissement(e);
                }
            }
        }
    }

    private ResponseEntity<ResponseDto> uploadFiles(String username, MultipartFile[] files, ResponseDto response,List<Document> documentsBd) {
        if(files.length > 0){
            //storageService.deleteAll();
            storageService.init(username);
            for(MultipartFile file: files){
                String message = "";
                try {
                    storageService.save(file,username,documentsBd);
                } catch (Exception e) {
                    message = "Erreur d'importation du fichier " + file.getOriginalFilename() +": "+ e.getMessage()+" !";
                    response.setErrorMessage(message);
                    return ResponseEntity.ok().body(response);
                }
            }
        }
        return null;
    }


    private void setInfosGenrales(CondidatDto condidat, Condidat condidatBd) {
        String pattern = "yyyy-MM-dd";
        SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);

        condidatBd.setNom(condidat.getNom());
        condidatBd.setPrenom(condidat.getPrenom());
        condidatBd.setCin(condidat.getCin());
        condidatBd.setEtat(condidat.getEtat());
        condidatBd.setAdresse(condidat.getAdresse());
        try {
            condidatBd.setDateNaissance(condidat.getDateNaissance() != null && condidat.getDateNaissance() !="" ? dateFormat.parse(condidat.getDateNaissance()) : null);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        condidatBd.setSexe(condidat.getSexe());
        condidatBd.setTelephone(condidat.getTelephone());

        condidatBd.setEtatCivil(condidat.getEtatCivil() !=null && condidat.getEtatCivil().getId() != -1 ? condidat.getEtatCivil() : null);
        condidatBd.setTypeCondidature(condidat.getTypeCondidature() !=null && condidat.getTypeCondidature().getId() != -1 ? condidat.getTypeCondidature() : null);
        condidatBd.setPosteActuel(condidat.getPosteActuel()!=null && condidat.getPosteActuel().getId() != -1 ? condidat.getPosteActuel() : null );
        condidatBd.setDomaine(condidat.getDomaine()!=null && condidat.getDomaine().getId() != -1 ? condidat.getDomaine() : null);
        condidatBd.setaConfirmer(condidat.isaConfirmer());
        condidatBd.setDateModif(new Date());
        condidatBd.setDemandeModif(condidat.isDemandeModif());

    }


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

   @PostMapping("/confirmer/{username}")
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
    @PostMapping(value="/demandeModif/{username}")
    public ResponseEntity<ResponseDto> demanderModif(@PathVariable  String username){
        ResponseDto response=new ResponseDto();
        try {
            Condidat condidatBd = condidatService.getCondidatByUsername(username);
            condidatBd.setDemandeModif(true);
            condidatService.saveCondidat(condidatBd);
            response.setSuccesMessage("Votre demande de modification est envoyée avec succès!");
        }catch(Exception ex){
            response.setErrorMessage("Erreur d'envoie de demande de modification'");
            return ResponseEntity.ok().body(response);
        }
        return ResponseEntity.ok().body(response);
    }
   public void saveEtablissement(String libelle){
    etablissementService.addEtablissement(new Etablissement(libelle));
}

    @PostMapping("/updateUserInfos/{username}")
    public ResponseEntity<ResponseDto> updateUserInfos(@PathVariable String username,@RequestParam("file") MultipartFile[] files, @RequestParam("user") String user) throws JsonProcessingException {
        UserDto userDto = new ObjectMapper().readValue(user, UserDto.class);
        ResponseDto response = new ResponseDto();
        try {
            Condidat condidatBd = condidatService.getCondidatByUsername(username);
            Utilisateur u=condidatBd;

            if (condidatBd != null) {
                condidatBd.setUsername(userDto.getLogin());
                u.setPassword(userDto.getPassword());

                if (files != null && files.length != 0) {
                    ResponseEntity<ResponseDto> responseUpload = uploadFiles(userDto.getLogin(), files, response, condidatBd.getDocuments());
                    if (responseUpload != null) return responseUpload;
                }
            }
            condidatBd.getDocuments().forEach(d ->{
                if(d.getType().equals("PHOTO")){
                    d.setNom(files[0].getOriginalFilename());
                }
            });
            userService.save(u);
            condidatService.saveCondidat(condidatBd);
            this.storageService.deleteNotExistingFiles(condidatBd.getDocuments(), condidatBd.getUsername());

        } catch (Exception e) {
            response.setErrorMessage("Erreur d'enregistrement!");
            return ResponseEntity.ok().body(response);
        }
        response.setSuccesMessage("Vos informations sont enregistrées avec succès!");
        return ResponseEntity.ok().body(response);
    }

}
