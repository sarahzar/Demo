package tn.esprit.esponline.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.esprit.esponline.metier.upload.IFilesStorageService;

@SpringBootApplication
@PropertySource(value="classpath:ApplicationResources.properties")
@ComponentScan(basePackages = {"tn.esprit.esponline.*","tn.esprit.esponline.metier.*"})
@EntityScan(basePackages = {"tn.esprit.esponline.*"})
@EnableJpaRepositories(basePackages = {"tn.esprit.esponline.*"})
public class RestWebApplication {
	@Autowired
	private IFilesStorageService filesStorageService;

//	@Autowired
//	private IUserService userService;
//	@Autowired
//	private ICondidatService condidatService;
//	@Bean
//	public JavaMailSender getJavaMailSender() {
//		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//		mailSender.setHost("smtp.gmail.com");
//		mailSender.setPort(587);
//
//		mailSender.setUsername(ServerMailUtil.MAIL_ADDRESS_SERVER);
//		mailSender.setPassword(ServerMailUtil.MAIL_PASSWORD);
//
//		Properties props = mailSender.getJavaMailProperties();
//		props.put("mail.transport.protocol", "smtp");
//		props.put("mail.smtp.auth", "true");
//		props.put ("mail.smtp.ssl.trust", "smtp.gmail.com");
//		props.put("mail.smtp.starttls.enable", "true");
//		props.put("mail.debug", "true");
//
//		return mailSender;
//	}
//	@Bean
//	public CommandLineRunner setupDefaultUser(IUserService service) {
//		return args -> {
//
//
//			/*	condidatService.saveCondidat(new Condidat(
//					"sarah.zaroui@esprit.tn", //username
//					"user", //password
//					"sarah.zaroui@esprit.tn",
//					Arrays.asList(new Role("USER"), new Role("ACTUATOR")),//roles
//					true//Active
//			));*/
//		};
//	}

	@Bean
	public PasswordEncoder getPasswordEncoder(){
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		SpringApplication.run(RestWebApplication.class, args);
	}
	@Bean
	CommandLineRunner init() {
		return (args) -> {
			//filesStorageService.deleteAll();
			filesStorageService.initRootDirectory();
		};
	}
}
