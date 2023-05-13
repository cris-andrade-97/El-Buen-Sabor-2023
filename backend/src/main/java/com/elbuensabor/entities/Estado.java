package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "estado")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Estado extends Base{
    @Column
    private String denominacion;

    @OneToMany(mappedBy = "estado")
    private List<Pedido> pedidos = new ArrayList<>();
}
