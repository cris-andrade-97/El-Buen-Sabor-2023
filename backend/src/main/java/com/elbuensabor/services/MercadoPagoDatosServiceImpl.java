package com.elbuensabor.services;

import com.elbuensabor.entities.MercadoPagoDatos;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.MercadoPagoDatosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MercadoPagoDatosServiceImpl extends BaseServiceImpl<MercadoPagoDatos, Long> implements MercadoPagoDatosService{
    public MercadoPagoDatosServiceImpl(BaseRepository<MercadoPagoDatos, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private MercadoPagoDatosRepository mercadoPagoDatosRepository;
}
