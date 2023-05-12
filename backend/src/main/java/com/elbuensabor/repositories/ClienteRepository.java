package com.elbuensabor.repositories;

import com.elbuensabor.entities.Cliente;
import com.elbuensabor.entities.Persona;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository  extends BaseRepository<Cliente, Long>{
}
