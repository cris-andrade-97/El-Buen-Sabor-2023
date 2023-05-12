package com.elbuensabor.repositories;

import com.elbuensabor.entities.Pedido;
import com.elbuensabor.entities.Persona;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository  extends BaseRepository<Pedido, Long>{
}
