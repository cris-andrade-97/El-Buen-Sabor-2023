package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "mercadoPagoDatos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MercadoPagoDatos extends Base {
    @Column
    private Long identificadoPago;
    @Column
    private Date fechaCreacion;
    @Column
    private Date fechaAprobacion;
    @Column
    private String formaPago;
    @Column
    private String metodoPago;
    @Column
    private String nroTarjeta;
    @Column
    private String estado;

    private Pedido pedido;
}
