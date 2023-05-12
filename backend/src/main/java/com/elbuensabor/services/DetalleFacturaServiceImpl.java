package com.elbuensabor.services;

import com.elbuensabor.entities.DetalleFactura;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.DetalleFacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetalleFacturaServiceImpl extends BaseServiceImpl<DetalleFactura, Long> implements DetalleFacturaService{
    public DetalleFacturaServiceImpl(BaseRepository<DetalleFactura, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;
}
