package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "detalleFactura")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DetalleFactura extends Base {
    @Column
    private Integer cantidad;
    @Column
    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "factura_id")
    private Factura factura;

    @ManyToOne
    @JoinColumn(name = "articuloManufacturado_id")
    private ArticuloManufacturado articuloManufacturado;

    @ManyToOne
    @JoinColumn(name = "articuloInsumo_id")
    private ArticuloInsumo articuloInsumo;

}
