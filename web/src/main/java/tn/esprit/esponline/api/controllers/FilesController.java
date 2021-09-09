package tn.esprit.esponline.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import tn.esprit.esponline.api.DTO.DocumentDto;
import tn.esprit.esponline.api.DTO.ResponseDto;
import tn.esprit.esponline.metier.upload.IFilesStorageService;
import tn.esprit.esponline.metier.upload.ResourceDto;
import tn.esprit.esponline.persistence.entities.Document;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class FilesController {

    @Autowired
    IFilesStorageService storageService;

    @PostMapping(value ="/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> uploadFile(@RequestParam MultipartFile file) {
        String message = "";
        ResponseDto responseDto=new ResponseDto();
        try {
//            storageService.save(file);
//
//            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            responseDto.setSuccesMessage(message);
            return ResponseEntity.status(HttpStatus.OK).body(responseDto);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + e.getMessage()+" !";
            responseDto.setErrorMessage(message);
            return ResponseEntity.ok().body(responseDto);
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<Document>> getListFiles() {
        List<Document> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();
            Document doc=new Document();
          //  doc.setChemin(url);
            doc.setNom(filename);
            return doc;
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/files/{filename:.+}/{username}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename,@PathVariable String username) {
        ResourceDto resource = storageService.load(filename,username);
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(resource.getType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFile().getFilename() + "\"").body(resource.getFile());
    }
}
