package com.elbuensabor.controllers;

import com.elbuensabor.entities.DetalleFactura;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.DetalleFacturaServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/detalleFactura")
public class DetalleFacturaController extends BaseControllerImpl<DetalleFactura, DetalleFacturaServiceImpl>{
}
