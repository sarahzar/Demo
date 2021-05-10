package tn.esprit.esponline.persistence.entities;



import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "id_role")
    private Long id;
    private String name;
    @ManyToMany(mappedBy="roles")
    private List<Utilisateur> users=new ArrayList<Utilisateur>();

    public Role(String name) {
        this.name = name;
    }

    public Role() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Utilisateur> getUsers() {
        return users;
    }

    public void setUsers(List<Utilisateur> users) {
        this.users = users;
    }
}
