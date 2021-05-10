package tn.esprit.esponline.api.DTO;

import org.springframework.web.multipart.MultipartFile;

public class DocumentDto {

    private int id;
    private MultipartFile file;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
