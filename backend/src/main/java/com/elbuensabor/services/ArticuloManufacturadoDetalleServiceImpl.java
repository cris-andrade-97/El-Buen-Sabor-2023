package com.elbuensabor.services;

import com.elbuensabor.entities.ArticuloManufacturadoDetalle;
import com.elbuensabor.repositories.ArticuloManufacturadoDetalleRepository;
import com.elbuensabor.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticuloManufacturadoDetalleServiceImpl extends BaseServiceImpl<ArticuloManufacturadoDetalle, Long> implements ArticuloManufacturadoDetalleService {

    public ArticuloManufacturadoDetalleServiceImpl(BaseRepository<ArticuloManufacturadoDetalle, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private ArticuloManufacturadoDetalleRepository articuloManufacturadoDetalleRepository;
}
