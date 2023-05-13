package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "domicilio")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Domicilio extends Base {
    @Column(name = "calle")
    private String calle;

    @Column(name = "numero")
    private int numero;

    @Column(name = "localidad")
    private String localidad;

    @OneToMany(mappedBy = "domicilio")
    private List<Pedido> pedidos = new ArrayList<Pedido>();

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

}
