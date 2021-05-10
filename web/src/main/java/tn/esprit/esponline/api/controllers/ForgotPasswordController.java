package tn.esprit.esponline.api.controllers;

import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import tn.esprit.esponline.api.DTO.MailInfosDto;
import tn.esprit.esponline.api.DTO.ResponseDto;
import tn.esprit.esponline.api.DTO.ResetInfosDto;
import tn.esprit.esponline.persistence.entities.Utilisateur;
import tn.esprit.esponline.metier.exceptions.UsernameEmailNotFoundException;
import tn.esprit.esponline.metier.authentification.IUserService;
import tn.esprit.esponline.api.utilities.ServerMailUtil;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@CrossOrigin
@Controller
public class ForgotPasswordController {

    @Autowired
    private IUserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${reset.password.subject}")
    private String resetPasswordSubject;

    @Value("${reset.password.body.bonjour}")
    private String resetPasswordBodyBonjour;

    @Value("${reset.password.body.lien}")
    private String resetPasswordBodyLien;

    @Value("${reset.password.body.change.password}")
    private String resetPasswordBodyChange;

    @Value("${reset.password.confirm.send.mail}")
    private String resetPasswordConfirmMail;

    @Value("${success.reset.password}")
    private String resetPasswordSuccessChange;

    @Value("${error.reset.password.token.not.found}")
    private String resetPasswordUserNotFound;

    @PostMapping("/forgot_password")
    public ResponseEntity<ResponseDto> processForgotPassword(HttpServletRequest request,
                                                             @RequestBody MailInfosDto mailInfos
     ){

        String email=mailInfos.getMail();
        //String username=mailInfos.getUsername();
        String token= RandomString.make(45);
        ResponseDto forgotResponse=new ResponseDto();

        try {
            userService.updateResetPassword(email,token);
          //  String resetPasswordLink= ForgotUtility.getSiteUrl(request)+"/reset_password?token="+token;
            String resetPasswordLink="http://localhost:3000/reset/"+token;
            System.out.println("**************link*************"+resetPasswordLink);

            try {
                sendEmail(email,resetPasswordLink);
                forgotResponse.setSuccesMessage(resetPasswordConfirmMail);
            } catch (UnsupportedEncodingException | MessagingException e) {
                forgotResponse.setErrorMessage(e.getMessage());
            }


        } catch (UsernameEmailNotFoundException e) {
            forgotResponse.setErrorMessage(e.getMessage());
            return ResponseEntity.ok().body(forgotResponse);
        }

        return ResponseEntity.ok().body(forgotResponse);
    }

    private void sendEmail(String email, String resetPasswordLink) throws UnsupportedEncodingException, MessagingException {
        MimeMessage message=mailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(message);


            helper.setFrom(ServerMailUtil.FROM_EMAIL,"Esprit SIRH");
            helper.setTo(email);
            String subject=resetPasswordSubject;
            StringBuilder content=new StringBuilder();
            content.append("<p>"+resetPasswordBodyBonjour+"</p>");
            content.append("<p>"+resetPasswordBodyLien+"</p>");
            content.append("<p><b><a href=\""+ resetPasswordLink + "\">"+resetPasswordBodyChange+"</a><b></p> ");

            helper.setSubject(subject);
            helper.setText(String.valueOf(content),true);

            mailSender.send(message);

    }

    @PostMapping("/reset_password")
    public ResponseEntity<ResponseDto> processResetPassword(@RequestBody ResetInfosDto resetInfos){

        String token = resetInfos.getToken();
        String newPassword=resetInfos.getNewPassword();
        ResponseDto resetResponse=new ResponseDto();

        Utilisateur user=userService.get(token);
        if(user==null){
            resetResponse.setErrorMessage(resetPasswordUserNotFound);
            return ResponseEntity.ok().body(resetResponse);
        }else{
            userService.updatePassword(user,newPassword);
            resetResponse.setSuccesMessage(resetPasswordSuccessChange);
        }
        return ResponseEntity.ok().body(resetResponse);
    }
}
