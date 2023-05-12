package com.elbuensabor.repositories;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository  extends BaseRepository<Usuario, Long>{
}
