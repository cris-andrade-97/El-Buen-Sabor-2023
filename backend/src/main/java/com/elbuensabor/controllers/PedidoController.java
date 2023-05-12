package com.elbuensabor.controllers;

import com.elbuensabor.entities.Pedido;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.PedidoServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/pedido")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl>{
}
