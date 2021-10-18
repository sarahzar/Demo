package tn.esprit.esponline.api.DTO;







import tn.esprit.esponline.persistence.entities.*;

import java.util.Date;
import java.util.List;

public class CondidatDto {
    private String nom;
    private String prenom;
    private String dateNaissance;
    private String sexe;
    private int etat;
    private int cin;
    private int telephone;
    private int anneeObtention;
    private TypeCondidature typeCondidature;
    private Poste posteActuel;
    private Parcour dernierDiplome;
    private Domaine domaine;
    private EtatCivil etatCivil;
    private boolean aConfirmer;
    private  Date dateInscrit;
    private List<Parcour> parcourScolaire;
    private List<ExperienceEnseignantDTO> experienceEnseignants;
    private List<ExperienceProfessionelDTO> experienceProfessionels;
    private List<Competence> competences;
    private List<Recherche> recherches;
    private List<Document> documents;
    private boolean demandeModif;
    private Date dateModif;

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

    public String getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(String dateNaissance) {
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

    public int getAnneeObtention() {
        return anneeObtention;
    }

    public void setAnneeObtention(int anneeObtention) {
        this.anneeObtention = anneeObtention;
    }

    public TypeCondidature getTypeCondidature() {
        return typeCondidature;
    }

    public void setTypeCondidature(TypeCondidature typeCondidature) {
        this.typeCondidature = typeCondidature;
    }

    public Poste getPosteActuel() {
        return posteActuel;
    }

    public void setPosteActuel(Poste posteActuel) {
        this.posteActuel = posteActuel;
    }

    public Parcour getDernierDiplome() {
        return dernierDiplome;
    }

    public void setDernierDiplome(Parcour dernierDiplome) {
        this.dernierDiplome = dernierDiplome;
    }

    public Domaine getDomaine() {
        return domaine;
    }

    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }

    public EtatCivil getEtatCivil() {
        return etatCivil;
    }

    public void setEtatCivil(EtatCivil etatCivil) {
        this.etatCivil = etatCivil;
    }

    public boolean isaConfirmer() {
        return aConfirmer;
    }

    public void setaConfirmer(boolean aConfirmer) {
        this.aConfirmer = aConfirmer;
    }

    public Date getDateInscrit() {
        return dateInscrit;
    }

    public void setDateInscrit(Date dateInscrit) {
        this.dateInscrit = dateInscrit;
    }

    public List<Parcour> getParcourScolaire() {
        return parcourScolaire;
    }

    public void setParcourScolaire(List<Parcour> parcourScolaire) {
        this.parcourScolaire = parcourScolaire;
    }

    public List<ExperienceEnseignantDTO> getExperienceEnseignants() {
        return experienceEnseignants;
    }

    public void setExperienceEnseignants(List<ExperienceEnseignantDTO> experienceEnseignants) {
        this.experienceEnseignants = experienceEnseignants;
    }

    public List<ExperienceProfessionelDTO> getExperienceProfessionels() {
        return experienceProfessionels;
    }

    public void setExperienceProfessionels(List<ExperienceProfessionelDTO> experienceProfessionels) {
        this.experienceProfessionels = experienceProfessionels;
    }

    public List<Competence> getCompetences() {
        return competences;
    }

    public void setCompetences(List<Competence> competences) {
        this.competences = competences;
    }

    public List<Recherche> getRecherches() {
        return recherches;
    }

    public void setRecherches(List<Recherche> recherches) {
        this.recherches = recherches;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public boolean isDemandeModif() {
        return demandeModif;
    }

    public void setDemandeModif(boolean demandeModif) {
        this.demandeModif = demandeModif;
    }

    public Date getDateModif() {
        return dateModif;
    }

    public void setDateModif(Date dateModif) {
        this.dateModif = dateModif;
    }
}
