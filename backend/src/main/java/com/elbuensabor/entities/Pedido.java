package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Pedido extends Base {
    @Column
    private Long fecha;
    @Column
    private Integer numero;
    @Column
    private Long horaEstimadaFin;
    @Column
    private Double total;

    private Envio envio;
    private MercadoPagoDatos mercadoPagoDatos;
    private Factura factura;
    private Cliente cliente;
    private List<DetallePedido> detallesPedido = new ArrayList<DetallePedido>();
    private Domicilio domicilio;
    private Estado estado;
}
