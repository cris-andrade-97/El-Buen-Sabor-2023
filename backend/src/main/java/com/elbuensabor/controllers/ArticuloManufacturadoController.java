package com.elbuensabor.controllers;

import com.elbuensabor.entities.ArticuloManufacturado;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.ArticuloInsumoServiceImpl;
import com.elbuensabor.services.ArticuloManufacturadoServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/articuloManufacturado")
public class ArticuloManufacturadoController extends BaseControllerImpl<ArticuloManufacturado, ArticuloManufacturadoServiceImpl>{
}
