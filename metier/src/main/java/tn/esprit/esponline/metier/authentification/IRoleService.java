package tn.esprit.esponline.metier.authentification;


import tn.esprit.esponline.persistence.entities.Role;

import java.util.List;

public interface IRoleService {

    public Role findByName(String name);
    public void save(Role role);
    public List<Role> allRoles();
}
