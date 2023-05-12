package com.elbuensabor.controllers;

import com.elbuensabor.entities.MercadoPagoDatos;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.MercadoPagoDatosServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/mercadoPagoDatos")
public class MercadoPagoDatosController extends BaseControllerImpl<MercadoPagoDatos, MercadoPagoDatosServiceImpl>{
}
