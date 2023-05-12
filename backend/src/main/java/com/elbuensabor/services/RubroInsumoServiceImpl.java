package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.RubroInsumo;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.RubroInsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RubroInsumoServiceImpl extends BaseServiceImpl<RubroInsumo, Long> implements RubroInsumoService{
    public RubroInsumoServiceImpl(BaseRepository<RubroInsumo, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private RubroInsumoRepository rubroInsumoRepository;
}
