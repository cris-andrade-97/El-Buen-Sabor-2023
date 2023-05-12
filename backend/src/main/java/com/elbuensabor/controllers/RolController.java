package com.elbuensabor.controllers;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.Rol;
import com.elbuensabor.services.PersonaServiceImpl;
import com.elbuensabor.services.RolServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/rol")
public class RolController extends BaseControllerImpl<Rol, RolServiceImpl>{
}
