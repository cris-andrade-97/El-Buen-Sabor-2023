package com.elbuensabor.controllers;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.RubroArticuloManufacturado;
import com.elbuensabor.services.PersonaServiceImpl;
import com.elbuensabor.services.RubroArticuloManufacturadoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/rubroArticuloManufacturado")
public class RubroArticuloManufacturadoController extends BaseControllerImpl<RubroArticuloManufacturado, RubroArticuloManufacturadoServiceImpl>{
}
