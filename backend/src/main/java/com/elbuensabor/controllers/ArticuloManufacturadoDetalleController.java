package com.elbuensabor.controllers;

import com.elbuensabor.entities.ArticuloManufacturadoDetalle;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.ArticuloManufacturadoDetalleServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/articuloManufacturadoDetalle")
public class ArticuloManufacturadoDetalleController extends BaseControllerImpl<ArticuloManufacturadoDetalle, ArticuloManufacturadoDetalleServiceImpl>{
}
