package com.elbuensabor.services;

import com.elbuensabor.entities.ArticuloManufacturado;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.ArticuloManufacturadoRepository;
import com.elbuensabor.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticuloManufacturadoServiceImpl extends BaseServiceImpl<ArticuloManufacturado, Long> implements ArticuloManufacturadoService{
    public ArticuloManufacturadoServiceImpl(BaseRepository<ArticuloManufacturado, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private ArticuloManufacturadoRepository articuloManufacturadoRepository;
}
