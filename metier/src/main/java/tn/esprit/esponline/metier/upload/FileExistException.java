package tn.esprit.esponline.metier.upload;

public class FileExistException extends Exception {
    public FileExistException(String fileExistMsg) {
        super(fileExistMsg);
    }
}
