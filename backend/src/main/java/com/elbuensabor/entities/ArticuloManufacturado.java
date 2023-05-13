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
public class ArticuloManufacturado extends Base {
    @Column
    private Integer tiempoEstimadoCocina;
    @Column
    private String denominacion;
    @Column
    private Double precioVenta;
    @Column
    private String imagen;
    @Column
    private Boolean estado;
    @Column
    private Double precioCosto;


    @OneToMany(mappedBy = "articuloManufacturado")
    private List<DetalleFactura> detallesFactura = new ArrayList<>();

    @OneToMany(mappedBy = "articuloManufacturado")
    private List<ArticuloManufacturadoDetalle> articuloManufacturadoDetalles = new ArrayList<>();

    @OneToMany(mappedBy = "articuloManufacturado")
    private List<DetallePedido> detallesPedido = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "rubro_articulo_manufacturado_id")
    private RubroArticuloManufacturado rubroArticuloManufacturado;

}
