package com.elbuensabor.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column
    private Boolean estado;
    @Column
    private Boolean aLaVenta;

    @ManyToOne
    @JoinColumn(name = "rubroPadre_id")
    private RubroInsumo rubroPadre;

    @OneToMany(mappedBy = "rubroPadre", cascade = CascadeType.ALL)
    private List<RubroInsumo> rubrosHijos = new ArrayList<RubroInsumo>();


    @JsonIgnore
    @OneToMany(mappedBy = "rubroInsumo", cascade = CascadeType.ALL)
    private List<ArticuloInsumo> articulosInsumo = new ArrayList<ArticuloInsumo>();

}
