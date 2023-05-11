package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;

import java.util.List;

public interface PersonaService extends BaseService<Persona, Long> {

    List<Persona> search(String filtro) throws Exception;

}
