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
@Table(name = "rubroArticuloManufacturado")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RubroArticuloManufacturado extends Base {
    @Column
    private String denominacion;

    @OneToMany(mappedBy = "rubroArticuloManufacturado")
    private List<ArticuloManufacturado> articulosManufacturados = new ArrayList<ArticuloManufacturado>();
}
