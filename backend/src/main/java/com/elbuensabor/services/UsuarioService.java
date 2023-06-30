package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.Usuario;

import java.util.List;

public interface UsuarioService extends BaseService<Usuario, Long> {

    List<Usuario> searchUID(String uid) throws Exception;
}
