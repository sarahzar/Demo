package tn.esprit.esponline.metier.authentification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.persistence.entities.Role;
import tn.esprit.esponline.persistence.repositories.authentification.RoleRepository;

import java.util.List;


@Service
public class RoleService implements IRoleService {

    @Autowired
    private RoleRepository roleRepo;


    @Override
    public Role findByName(String name) {
        return roleRepo.findByName(name);
    }

    @Override
    public void save(Role role) {
        roleRepo.save(role);
    }

    @Override
    public List<Role> allRoles() {
        return roleRepo.findAll();
    }
}
