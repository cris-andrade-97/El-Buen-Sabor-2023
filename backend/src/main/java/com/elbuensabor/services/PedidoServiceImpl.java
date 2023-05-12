package com.elbuensabor.services;

import com.elbuensabor.entities.Pedido;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServiceImpl extends BaseServiceImpl<Pedido, Long> implements PedidoService{
    public PedidoServiceImpl(BaseRepository<Pedido, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private PedidoRepository pedidoRepository;
}
