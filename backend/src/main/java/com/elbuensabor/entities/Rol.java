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
@Table(name = "rol")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Rol extends Base {
    @Column
    private String denominacion;

    @JsonIgnore
    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios = new ArrayList<>();

}
