package tn.esprit.esponline.api.utilities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.api.DTO.ExperienceEnseignantDTO;
import tn.esprit.esponline.api.DTO.ExperienceProfessionelDTO;
import tn.esprit.esponline.metier.condidature.*;
import tn.esprit.esponline.metier.nomenclatures.IParcourService;
import tn.esprit.esponline.metier.nomenclatures.ParcourService;
import tn.esprit.esponline.persistence.entities.*;

import java.util.ArrayList;
import java.util.List;


public class CondidatUtilities {

    @Autowired
    private IExperienceProService experienceProService;
    @Autowired
    private IExperienceEnsService experienceEnsService;
    @Autowired
    private ICompetenceService competenceService;
    @Autowired
    private IRechercheService rechercheService;
    @Autowired
    private IParcourService parcourService;

    public static  <T,D,S> void majListeBd(List<T> entities, List<D> dtos, S service) {


        List<Long> listIdDb = entities!=null && !entities.isEmpty() ? addListeIdsFromEntity(entities, new ArrayList<>()) : null;

        List<Long> listIdDto  = dtos!=null && !entities.isEmpty() ? addListeIdsFromDto(dtos, new ArrayList<>()) : null;

        if(listIdDto !=null && !listIdDto.isEmpty()) {
            listIdDb.forEach(id -> {
                if (!listIdDto.contains(id)) {
                    deleteElement(service, id);
                }
            });
        }if(listIdDto !=null && listIdDto.isEmpty()) {
            listIdDb.forEach(id ->{
                deleteElement(service, id);
            });
        }
    }

    private static <S> void deleteElement(S service, Long id) {

            Class c = service.getClass();
            Class p = ParcourService.class;

            if (service instanceof ParcourService) {
                ((IParcourService) service).deleteById(id);
            }
            if (service instanceof ICompetenceService) {
                ((ICompetenceService) service).deleteById(id);
            }
            if (service instanceof IExperienceEnsService) {
                ((IExperienceEnsService) service).deleteById(id);
            }
            if (service instanceof IExperienceProService) {
                ((IExperienceProService) service).deleteById(id);
            }
            if (service  instanceof  IRechercheService) {
                ((IRechercheService) service).deleteById(id);
            }

    }

    private static <D> List<Long> addListeIdsFromDto(List<D> dtos, List<Long> listIdDto) {
        dtos.forEach(d -> {

            if (d.getClass() ==  Parcour.class) {
                long id = ((Parcour) d).getId();
                listIdDto.add(id);
            }
            if (d.getClass()  == ExperienceEnseignantDTO.class) {
                long id = ((ExperienceEnseignantDTO) d).getId();
                listIdDto.add(id);
            }
            if (d.getClass() == ExperienceProfessionelDTO.class) {
                long id = ((ExperienceProfessionelDTO) d).getId();
                listIdDto.add(id);
            }
            if (d.getClass() ==  Competence.class) {
                long id = ((Competence) d).getId();
                listIdDto.add(id);
            }
            if (d.getClass() ==  Recherche.class) {
                long id = ((Recherche) d).getId();
                listIdDto.add(id);
            }

        });

        return listIdDto;
    }

    private static <T> List<Long> addListeIdsFromEntity(List<T> entities, List<Long> listIdDb) {
        entities.forEach(e -> {


            Class classType = e.getClass();
            Class expens = ExperienceEnseignant.class;
            Class exppro = ExperienceProfessionel.class;

            if (e.getClass() ==  Parcour.class) {
                long id = ((Parcour) e).getId();
                listIdDb.add(id);
            }
            if (e.getClass() ==   ExperienceEnseignant.class) {
                long id = ((ExperienceEnseignant) e).getId();
                listIdDb.add(id);
            }
            if (e.getClass() == ExperienceProfessionel.class) {
                long id = ((ExperienceProfessionel) e).getId();
                listIdDb.add(id);
            }
            if (e.getClass() == Competence.class) {
                long id = ((Competence) e).getId();
                listIdDb.add(id);
            }
            if (e.getClass() ==  Recherche.class) {
                long id = ((Recherche) e).getId();
                listIdDb.add(id);
            }

        });
        return  listIdDb;
    }

}
