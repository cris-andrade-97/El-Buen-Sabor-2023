package com.elbuensabor.services;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.Rol;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl extends BaseServiceImpl<Rol, Long> implements RolService{
    public RolServiceImpl(BaseRepository<Rol, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private RolRepository rolRepository;
}
