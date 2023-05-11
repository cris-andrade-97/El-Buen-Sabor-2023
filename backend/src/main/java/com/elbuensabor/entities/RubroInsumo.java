package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rubroInsumo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RubroInsumo extends Base {
    @Column
    private String denominacion;

    @ManyToOne
    @JoinColumn(name = "rubro_padre_id")
    private RubroInsumo rubroPadre;

    @OneToMany(mappedBy = "rubroPadre")
    private List<RubroInsumo> rubrosHijos = new ArrayList<RubroInsumo>();

    @OneToMany(mappedBy = "rubroInsumo")
    private List<ArticuloInsumo> articulosInsumo = new ArrayList<ArticuloInsumo>();
}
