package com.elbuensabor.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articuloInsumo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ArticuloInsumo extends Base {
    @Column
    private String denominacion;

    @Column
    private Double precioCompra;

    @Column
    private Double precioVenta;

    @Column
    private Double stockActual;

    @Column
    private Double stockMinimo;

    @Column
    private Boolean esInsumo;

    @Column
    private Boolean estado;

    @JsonIgnoreProperties("articulosInsumo")
    @ManyToOne
    private UnidadMedida unidadMedida;

    @OneToMany(mappedBy = "articuloInsumo")
    private List<DetallePedido> detallesPedido = new ArrayList<>();

    @OneToMany(mappedBy = "articuloInsumo")
    private List<DetalleFactura> detallesFactura = new ArrayList<>();

    @JsonIgnoreProperties("articulosInsumo")
    @ManyToOne
    private RubroInsumo rubroInsumo;

    @OneToMany(mappedBy = "articuloInsumo")
    private List<ArticuloManufacturadoDetalle> articulosManufacturadoDetalle = new ArrayList<>();


}
