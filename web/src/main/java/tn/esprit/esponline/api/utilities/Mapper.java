package tn.esprit.esponline.api.utilities;

import org.modelmapper.ModelMapper;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class Mapper {

    private static ModelMapper modelMapper;

    static {
        modelMapper = new ModelMapper();
    }

    public <T,D> D mapper(final T entity,Class<D> outclass){
        return modelMapper.map(entity,outclass);
    }

    public <T,D> List<D> mapAll(final Collection<T> entities, Class<D> outclass){
        return entities.stream().map(entity -> mapper(entity,outclass)).collect(Collectors.toList());
    }

}
