package com.elbuensabor.controllers;

import com.elbuensabor.entities.Persona;
import com.elbuensabor.entities.RubroInsumo;
import com.elbuensabor.services.PersonaServiceImpl;
import com.elbuensabor.services.RubroInsumoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/rubroInsumo")
public class RubroInsumoController extends BaseControllerImpl<RubroInsumo, RubroInsumoServiceImpl>{
}
