package com.elbuensabor.controllers;

import com.elbuensabor.entities.Factura;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.FacturaServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/factura")
public class FacturaController extends BaseControllerImpl<Factura, FacturaServiceImpl>{
}
