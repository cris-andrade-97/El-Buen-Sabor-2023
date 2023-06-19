package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.PersonaRepository;
import com.elbuensabor.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaServiceImpl extends BaseServiceImpl<Persona, Long> implements PersonaService {

    @Autowired
    private PersonaRepository personaRepository;



    public PersonaServiceImpl(BaseRepository<Persona, Long> baseRepository) {
        super(baseRepository);
    }


    @Override
    public List<Persona> search(String filtro) throws Exception {
        try {
            //List<Persona> personas = personaRepository.findByNombreContainingOrApellidoContaining(filtro, filtro);
            List<Persona> personas = personaRepository.search(filtro);

            return personas;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
