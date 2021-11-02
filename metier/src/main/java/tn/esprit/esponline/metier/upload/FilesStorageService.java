package tn.esprit.esponline.metier.upload;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.esponline.persistence.entities.Document;
import org.apache.commons.io.FilenameUtils;


import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;
@Service
public class FilesStorageService implements IFilesStorageService{

    static {
        String pattern = "yyyy-MM-dd";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        date = simpleDateFormat.format(new Date());
    }
    private  Path root = null;
    public static String date;

    @Override
    public void init(String username) {
        int year = Calendar.getInstance().get(Calendar.YEAR);
        this.addDirectory(year+"/"+username);
    }
    public void initRootDirectory(){

        this.root =Paths.get("C:/wamp/www/uploads/");
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public void addDirectory(String path){

        this.root= Paths.get("C:/wamp/www/uploads/"+path);
        try {
            if(!Files.isDirectory(root)){
                Files.createDirectories(root);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteNotExistingFiles(List<Document> documents, String username) throws IOException {
        int year = Calendar.getInstance().get(Calendar.YEAR);
        List<File> allFiles = new ArrayList<>();
        List<String> docNames = new ArrayList<>();

        File folder = new File("C:/wamp/www/uploads/" + year + "/" + username );
        for (File fileEntry : folder.listFiles()) {
            allFiles.add(fileEntry);
        }

        try {
            if(documents!=null && !documents.isEmpty()) {
                documents.forEach(d -> docNames.add(d.getNom()));

                for(File file: allFiles) {
                    if(!docNames.contains(file.getName())){
                        file.delete();
                    }
                }
            }else{
                for(File file: allFiles) {
                        file.delete();
                }
            }
        }catch (Exception ex) {
                throw new IOException("erreur de sppression du fichier");
        }
    }

    @Override
    public void save(MultipartFile file, String username, List<Document> documentsBD) throws FileExistException {
        String fileExistMsg=null;
        int year = Calendar.getInstance().get(Calendar.YEAR);

        try {
            File rechercheFile = new File("C:/wamp/www/uploads/"+year+"/"+username+"/"+file.getOriginalFilename());

            boolean existDoc = false;
            if(documentsBD!=null && !documentsBD.isEmpty()) {
                for (Document d : documentsBD) {
                    if (rechercheFile.getName().equals(d.getNom()) && FilenameUtils.getExtension(rechercheFile.getName()).equals(FilenameUtils.getExtension(d.getNom()))) {
                        existDoc = true;
                        break;
                    }
                }
            }

            if(!rechercheFile.exists()) {
                Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            }else if(rechercheFile.exists() && documentsBD!=null && !documentsBD.isEmpty() && !existDoc) {
                fileExistMsg="";
            }else{
                fileExistMsg="le fichier existe déjà";
                throw new FileExistException(fileExistMsg);
            }
        } catch (Exception e) {
            if(e.getMessage()==fileExistMsg)
                throw new FileExistException(fileExistMsg);
            else
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public ResourceDto load(String filename,String username) {

        int year = Calendar.getInstance().get(Calendar.YEAR);
        this.root =Paths.get("C:/wamp/www/uploads/"+year+"/"+username);
        ResourceDto resourceDto=new ResourceDto();
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            resourceDto.setFile(resource);

            String mimeType = Files.probeContentType(file);
            resourceDto.setType(mimeType);

            if (resource.exists() || resource.isReadable()) {
                return resourceDto;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        if(root!=null) {
            FileSystemUtils.deleteRecursively(root.toFile());
        }

    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

}
