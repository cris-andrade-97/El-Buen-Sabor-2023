package com.elbuensabor.controllers;

import com.elbuensabor.entities.Domicilio;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.DomicilioServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/domicilio")
public class DomicilioController extends BaseControllerImpl<Domicilio, DomicilioServiceImpl>{
}
