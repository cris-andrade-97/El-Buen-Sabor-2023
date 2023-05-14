package com.elbuensabor.entities;

import jakarta.persistence.*;
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

    @ManyToOne
    @JoinColumn(name = "envio_id")
    private Envio envio;

    @OneToOne(mappedBy = "pedido")
    private MercadoPagoDatos mercadoPagoDatos;

    @OneToOne(mappedBy = "pedido")
    private Factura factura;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido")
    private List<DetallePedido> detallesPedido = new ArrayList<DetallePedido>();

    @ManyToOne
    @JoinColumn(name = "domicilio_id")
    private Domicilio domicilio;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private Estado estado;
}
