package tn.esprit.esponline.metier.upload;

import org.springframework.core.io.Resource;

public class ResourceDto {

    private Resource file;
    private String type;

    public Resource getFile() {
        return file;
    }

    public void setFile(Resource file) {
        this.file = file;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
