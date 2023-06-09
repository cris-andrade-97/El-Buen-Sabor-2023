package com.elbuensabor.repositories;

import com.elbuensabor.entities.ArticuloManufacturado;
import com.elbuensabor.entities.Persona;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticuloManufacturadoRepository  extends BaseRepository<ArticuloManufacturado, Long>{



}
