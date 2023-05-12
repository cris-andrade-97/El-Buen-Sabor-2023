package com.elbuensabor.services;

import com.elbuensabor.entities.Envio;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.EnvioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnvioServiceImpl extends BaseServiceImpl<Envio, Long> implements EnvioService{
    public EnvioServiceImpl(BaseRepository<Envio, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private EnvioRepository envioRepository;
}
