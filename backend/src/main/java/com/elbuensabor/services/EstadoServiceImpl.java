package com.elbuensabor.services;

import com.elbuensabor.entities.Estado;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoServiceImpl extends BaseServiceImpl<Estado, Long> implements EstadoService{
    public EstadoServiceImpl(BaseRepository<Estado, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private EstadoRepository estadoRepository;
}
