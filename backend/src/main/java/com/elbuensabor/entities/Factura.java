package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "factura")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Factura extends Base {
    @Column
    private Date fecha;
    @Column
    private Integer numero;
    @Column
    private Double montoDescuento;
    @Column
    private String formaPago;
    @Column
    private String nroTarjeta;
    @Column
    private Double totalVenta;
    @Column
    private Double totalCosto;

    private Pedido pedido;
    private List<DetalleFactura> detallesFactura = new ArrayList<DetalleFactura>();
}
