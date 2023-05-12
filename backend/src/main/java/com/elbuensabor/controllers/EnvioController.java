package com.elbuensabor.controllers;

import com.elbuensabor.entities.Envio;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.EnvioServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/envio")
public class EnvioController extends BaseControllerImpl<Envio, EnvioServiceImpl>{
}
