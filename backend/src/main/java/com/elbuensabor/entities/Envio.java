package com.elbuensabor.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "envio")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Envio extends Base {
    @Column
    private String tipoEnvio;

    @OneToMany(mappedBy = "envio")
    private List<Pedido> pedidos = new ArrayList<>();

}
