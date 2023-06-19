package com.elbuensabor.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "articuloManufacturadoDetalle")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ArticuloManufacturadoDetalle extends Base {
    @Column
    private Double cantidad;

    //@ManyToOne
    //@JoinColumn(name = "unidad_medida_id")
    // private UnidadMedida unidadMedida;

    @JsonIgnoreProperties("articulosManufacturadoDetalle")
    @ManyToOne
    @JoinColumn(name = "articulo_insumo_id")
    private ArticuloInsumo articuloInsumo;

    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIgnoreProperties("articuloManufacturadoDetalles")
    @ManyToOne
    @JoinColumn(name = "articulo_manufacturado_id")
    private ArticuloManufacturado articuloManufacturado;
}
