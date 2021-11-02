package tn.esprit.esponline.metier.upload;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.esponline.persistence.entities.Document;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface IFilesStorageService {

    public void init(String username);

    public void save(MultipartFile file, String username, List<Document> documents) throws FileExistException;

    public ResourceDto load(String filename,String username);

    public void deleteAll();

    public Stream<Path> loadAll();

    public void initRootDirectory();
    public void addDirectory(String path);
    public void deleteNotExistingFiles(List<Document> documents,String username) throws IOException;



}
