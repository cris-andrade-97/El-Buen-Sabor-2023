package com.elbuensabor.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "estado")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Estado extends Base{
    @Column
    private String denominacion;
}
