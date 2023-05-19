package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "unidadMedida")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class UnidadMedida extends Base {
    @Column
    private String denominacion;
    @Column
    private String unidad;

    @OneToMany(mappedBy = "unidadMedida")
    private List<ArticuloInsumo> articulosInsumo = new ArrayList<>();

  //  @OneToMany(mappedBy = "unidadMedida")
   // private List<ArticuloManufacturadoDetalle> articulosManufacturadosDetalle = new ArrayList<>();

}
