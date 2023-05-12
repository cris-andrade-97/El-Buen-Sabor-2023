package com.elbuensabor.repositories;

import com.elbuensabor.entities.Factura;
import com.elbuensabor.entities.Persona;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaRepository  extends BaseRepository<Factura, Long>{
}
