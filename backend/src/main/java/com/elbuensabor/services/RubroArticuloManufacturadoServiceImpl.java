package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.RubroArticuloManufacturado;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.RubroArticuloManufacturadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RubroArticuloManufacturadoServiceImpl extends BaseServiceImpl<RubroArticuloManufacturado, Long> implements RubroArticuloManufacturadoService{
    public RubroArticuloManufacturadoServiceImpl(BaseRepository<RubroArticuloManufacturado, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private RubroArticuloManufacturadoRepository rubroArticuloManufacturadoRepository;
}
