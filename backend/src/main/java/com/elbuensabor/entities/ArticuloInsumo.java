package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articuloInsumo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticuloInsumo extends Base {
    @Column
    private String denominacion;
    @Column
    private Double precioCompra;
    @Column
    private Double precioVenta;
    @Column
    private Double stockActual;
    @Column
    private Double stockMinimo;
    @Column
    private Boolean esInsumo;

    @ManyToOne
    @JoinColumn(name = "unidadMedida_id")
    private UnidadMedida unidadMedida;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "articuloInsumo_detallePedido",
            joinColumns = @JoinColumn(name = "articuloInsumo_id"),
            inverseJoinColumns = @JoinColumn(name = "detallePedido_id")
    )
    private List<DetallePedido> detallesPedido = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "articuloInsumo_detalleFactura",
            joinColumns = @JoinColumn(name = "articuloInsumo_id"),
            inverseJoinColumns = @JoinColumn(name = "detalleFactura_id")
    )
    private List<DetalleFactura> detallesFactura = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "rubroInsumo_id")
    private RubroInsumo rubroInsumo;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "articuloInsumo_articuloManufacturadoDetalle",
            joinColumns = @JoinColumn(name = "articuloInsumo_id"),
            inverseJoinColumns = @JoinColumn(name = "articuloManufacturadoDetalle_id")
    )
    private List<ArticuloManufacturadoDetalle> articulosManufacturadoDetalle = new ArrayList<>();

}
