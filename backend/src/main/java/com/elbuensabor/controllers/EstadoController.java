package com.elbuensabor.controllers;

import com.elbuensabor.entities.Estado;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.EnvioServiceImpl;
import com.elbuensabor.services.EstadoServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/estado")
public class EstadoController extends BaseControllerImpl<Estado, EstadoServiceImpl>{
}
