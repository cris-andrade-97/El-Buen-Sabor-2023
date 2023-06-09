package com.elbuensabor.repositories;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository  extends BaseRepository<Usuario, Long>{
    @Query(value = "SELECT u FROM Usuario u WHERE u.uid LIKE %:uid%")
    List<Usuario> searchUID(@Param("uid") String uid);
}
