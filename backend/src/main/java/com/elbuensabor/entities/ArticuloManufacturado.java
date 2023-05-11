package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articuloManufacturado")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticuloManufacturado extends Base{
    @Column
    private Integer tiempoEstimadoCocina;
    @Column
    private String denominacion;
    @Column
    private Double precioVenta;
    @Column
    private String imagen;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "articuloManufacturado_detalleFactura",
            joinColumns = @JoinColumn(name = "articuloManufacturado_id"),
            inverseJoinColumns = @JoinColumn(name = "detalleFacturao_id")
    )
    private List<DetalleFactura> detallesFactura = new ArrayList<DetalleFactura>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "articuloManufacturado_detallePedido",
            joinColumns = @JoinColumn(name = "articuloManufacturado_id"),
            inverseJoinColumns = @JoinColumn(name = "detallePedido_id")
    )
    private List<DetallePedido> detallesPedido = new ArrayList<DetallePedido>();

    @ManyToOne
    @JoinColumn(name = "rubroArticuloManufacturado_id")
    private RubroArticuloManufacturado rubroArticuloManufacturado;
}
