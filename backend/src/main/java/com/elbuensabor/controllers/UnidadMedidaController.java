package com.elbuensabor.controllers;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.UnidadMedida;
import com.elbuensabor.services.PersonaServiceImpl;
import com.elbuensabor.services.UnidadMedidaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/unidadMedida")
public class UnidadMedidaController extends BaseControllerImpl<UnidadMedida, UnidadMedidaServiceImpl>{
}
