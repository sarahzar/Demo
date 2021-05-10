package tn.esprit.esponline.persistence.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Condidat extends Utilisateur {

    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String sexe;
    private int etat;
    private int cin;
    private int telephone;
    private Date dateInscrit;
    private Date dateModif;
    private boolean aConfirmer;
    private boolean demandeModif;
    //private String poste;
    @Embedded
    @Transient
    @Column(nullable = true)
    private Adresse adresse;
    //assosiations
    @ManyToOne
    private TypeCondidature typeCondidature;
    @ManyToOne
    private Poste posteActuel;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<Parcour> parcourScolaire;
    @OneToOne(cascade = CascadeType.ALL)
    private Parcour dernierDiplome;
    @ManyToOne
    private Domaine domaine;
    @ManyToOne
    private EtatCivil etatCivil;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<ExperienceEnseignant> experienceEnseignants;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<ExperienceProfessionel> experienceProfessionels;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<Competence> competences;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<Recherche> recherches;
    @OneToMany(mappedBy ="condidat",cascade = CascadeType.ALL)
    private List<Document> documents;

    public Condidat(){
    }

    public Condidat(String login, String password, String mail, List<Role> roles, boolean active) {
        super(login, password, mail, roles, active);
    }

    /*public Condidat(String nom, String prenom, Date dateNaissance, String sexe, int etat, int cin, int telephone, String typeCondidature, Date dateInscrit, Date dateModif, boolean aConfirmer, boolean demandeModif, String posteActuel, String poste, Adresse adresse) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.sexe = sexe;
        this.etat = etat;
        this.cin = cin;
        this.telephone = telephone;
        this.typeCondidature = typeCondidature;
        this.dateInscrit = dateInscrit;
        this.dateModif = dateModif;
        this.aConfirmer = aConfirmer;
            this.demandeModif = demandeModif;
        this.posteActuel = posteActuel;
        this.poste = poste;
        this.adresse = adresse;
    }*/

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

    public Date getDateInscrit() {
        return dateInscrit;
    }

    public void setDateInscrit(Date dateInscrit) {
        this.dateInscrit = dateInscrit;
    }

    public Date getDateModif() {
        return dateModif;
    }

    public void setDateModif(Date dateModif) {
        this.dateModif = dateModif;
    }

    public boolean isaConfirmer() {
        return aConfirmer;
    }

    public void setaConfirmer(boolean aConfirmer) {
        this.aConfirmer = aConfirmer;
    }

    public boolean isDemandeModif() {
        return demandeModif;
    }

    public void setDemandeModif(boolean demandeModif) {
        this.demandeModif = demandeModif;
    }

   /* public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }*/

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
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

    public List<Parcour> getParcourScolaire() {
        return parcourScolaire;
    }

    public void setParcourScolaire(List<Parcour> parcourScolaire) {
        this.parcourScolaire = parcourScolaire;
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

    public List<ExperienceEnseignant> getExperienceEnseignants() {
        return experienceEnseignants;
    }

    public void setExperienceEnseignants(List<ExperienceEnseignant> experienceEnseignants) {
        this.experienceEnseignants = experienceEnseignants;
    }

    public List<ExperienceProfessionel> getExperienceProfessionels() {
        return experienceProfessionels;
    }

    public void setExperienceProfessionels(List<ExperienceProfessionel> experienceProfessionels) {
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
}
