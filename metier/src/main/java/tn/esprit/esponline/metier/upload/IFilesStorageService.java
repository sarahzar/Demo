package tn.esprit.esponline.metier.upload;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface IFilesStorageService {

    public void init(String username);

    public void save(MultipartFile file,String username) throws FileExistException;

    public ResourceDto load(String filename,String username);

    public void deleteAll();

    public Stream<Path> loadAll();

    public void initRootDirectory();
    public void addDirectory(String path);


}
