package tn.esprit.esponline.metier.nomenclatures;


import java.sql.SQLException;
import java.util.List;

public interface InterfaceCrud<T> {

    public List<T> getAll() throws SQLException;
    public T findById(int id);
    public void delete(T entity);
}
