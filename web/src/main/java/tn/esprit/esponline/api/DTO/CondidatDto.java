package tn.esprit.esponline.api.DTO;







import tn.esprit.esponline.persistence.entities.Competence;

import java.util.Date;
import java.util.List;

public class CondidatDto {
    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String sexe;
    private int etat;
    private int cin;
    private int telephone;
    private int anneeObtention;
    private int typeCondidatureId;
    private int posteActuelId;
    private int dernierDiplomeId;
    private int domaineId;
    private int etatCivilId;
    private int specialiteId;
    private int etablissementId;
    List<ParcoursDTO> listeParcours;
    List<ExperienceEnseignantDTO> condidatExperEnseignt;
    List<ExperienceProfessionelDTO> condidatExperProfessionel;
    List<Competence> competences;
    List<RechercheDTO> recherches;
    List<DocumentDto> documents;

    public CondidatDto() {
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public int getEtat() {
        return etat;
    }

    public void setEtat(int etat) {
        this.etat = etat;
    }

    public int getCin() {
        return cin;
    }

    public void setCin(int cin) {
        this.cin = cin;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public int getTypeCondidatureId() {
        return typeCondidatureId;
    }

    public void setTypeCondidatureId(int typeCondidatureId) {
        this.typeCondidatureId = typeCondidatureId;
    }

    public int getPosteActuelId() {
        return posteActuelId;
    }

    public void setPosteActuelId(int posteActuelId) {
        this.posteActuelId = posteActuelId;
    }

    public int getDernierDiplomeId() {
        return dernierDiplomeId;
    }

    public void setDernierDiplomeId(int dernierDiplomeId) {
        this.dernierDiplomeId = dernierDiplomeId;
    }

    public int getDomaineId() {
        return domaineId;
    }

    public void setDomaineId(int domaineId) {
        this.domaineId = domaineId;
    }

    public int getEtatCivilId() {
        return etatCivilId;
    }

    public void setEtatCivilId(int etatCivilId) {
        this.etatCivilId = etatCivilId;
    }

    public int getSpecialiteId() {
        return specialiteId;
    }

    public void setSpecialiteId(int specialiteId) {
        this.specialiteId = specialiteId;
    }

    public int getEtablissementId() {
        return etablissementId;
    }

    public void setEtablissementId(int etablissementId) {
        this.etablissementId = etablissementId;
    }

    public int getAnneeObtention() {
        return anneeObtention;
    }

    public void setAnneeObtention(int anneeObtention) {
        this.anneeObtention = anneeObtention;
    }

    public List<ParcoursDTO> getListeParcours() {
        return listeParcours;
    }

    public void setListeParcours(List<ParcoursDTO> listeParcours) {
        this.listeParcours = listeParcours;
    }

    public List<ExperienceEnseignantDTO> getCondidatExperEnseignt() {
        return condidatExperEnseignt;
    }

    public void setCondidatExperEnseignt(List<ExperienceEnseignantDTO> condidatExperEnseignt) {
        this.condidatExperEnseignt = condidatExperEnseignt;
    }

    public List<ExperienceProfessionelDTO> getCondidatExperProfessionel() {
        return condidatExperProfessionel;
    }

    public void setCondidatExperProfessionel(List<ExperienceProfessionelDTO> condidatExperProfessionel) {
        this.condidatExperProfessionel = condidatExperProfessionel;
    }

    public List<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(List<Competence> competences) {
        this.competences = competences;
    }

    public List<RechercheDTO> getRecherches() {
        return recherches;
    }

    public void setRecherches(List<RechercheDTO> recherches) {
        this.recherches = recherches;
    }

    public List<DocumentDto> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentDto> documents) {
        this.documents = documents;
    }
}
