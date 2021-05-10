package tn.esprit.esponline.persistence.entities;



import javax.persistence.*;
import java.util.List;

@Inheritance(strategy=InheritanceType.JOINED)
@Entity
public class Utilisateur {


    @Id
    @GeneratedValue(strategy=GenerationType.TABLE)
    @Column(name="id_user")
    private int id;
    private String username;
    private String password;
    @Column(length = 45)
    private String resetPasswordToken;
    private String mail;
    @ManyToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinTable(
            name="UTILISATEUR_ROLES" ,
            joinColumns=@JoinColumn(name="UTILISATEUR_ID" ,referencedColumnName="id_user"),
            inverseJoinColumns=@JoinColumn(name="ROLES_ID" ,referencedColumnName="id_role")

    )
  //  @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Role> roles;
    private boolean active;





    public Utilisateur(String login, String password, String mail, List<Role> roles, boolean active) {
    this.username=login;
    this.password=password;
    this.mail=mail;
    this.roles=roles;
    this.active=active;

    }

    public Utilisateur() {

    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public boolean isActive() {
        return active;
    }

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
