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
