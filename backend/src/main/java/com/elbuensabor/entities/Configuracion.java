package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "configuracion")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Configuracion implements Serializable {
    @Column
    private Integer cantidadCocineros;
    @Column
    private String emailEmpresa;
    @Column
    private String tokenMercadoPago;
}
