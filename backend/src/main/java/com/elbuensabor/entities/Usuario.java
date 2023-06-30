package com.elbuensabor.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario extends Base {
    @Column
    private String usuario;
    @Column
    private String clave;
    @Column
    private String uid;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;

    @JsonIgnore
    @OneToOne(mappedBy = "usuario")
    private Cliente cliente;

}
