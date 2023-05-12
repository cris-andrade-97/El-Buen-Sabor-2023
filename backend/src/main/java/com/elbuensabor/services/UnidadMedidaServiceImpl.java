package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.UnidadMedida;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.UnidadMedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnidadMedidaServiceImpl extends BaseServiceImpl<UnidadMedida, Long> implements UnidadMedidaService{
    public UnidadMedidaServiceImpl(BaseRepository<UnidadMedida, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private UnidadMedidaRepository unidadMedidaRepository;
}
