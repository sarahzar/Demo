package tn.esprit.esponline.api.utilities.enums;

public enum EDocumentType {

    Cv(1),PHOTO(2),LM(3),DIPLOME(4),ANNEXE(5);


    private int id;
    private String libelle;

    EDocumentType(int id){
     this.id=id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLibelle() {

        if(id ==1)
            libelle= "CV";
        else if(id==2)
            libelle= "PHOTO";
        else if(id==3)
            libelle= "LM";
        else if(id==4)
            libelle= "DIPLOME";
        else if(id==5)
            libelle= "ANNEXE";
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }
}
