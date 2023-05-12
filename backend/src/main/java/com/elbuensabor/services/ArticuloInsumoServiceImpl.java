package com.elbuensabor.services;

import com.elbuensabor.entities.ArticuloInsumo;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.ArticuloInsumoRepository;
import com.elbuensabor.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticuloInsumoServiceImpl extends BaseServiceImpl<ArticuloInsumo, Long> implements ArticuloInsumoService{
    public ArticuloInsumoServiceImpl(BaseRepository<ArticuloInsumo, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private ArticuloInsumoRepository articuloInsumoRepository;
}
