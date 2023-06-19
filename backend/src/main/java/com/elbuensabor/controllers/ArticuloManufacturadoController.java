package com.elbuensabor.controllers;

import com.elbuensabor.entities.ArticuloManufacturado;
import com.elbuensabor.entities.Persona;
import com.elbuensabor.services.ArticuloInsumoServiceImpl;
import com.elbuensabor.services.ArticuloManufacturadoServiceImpl;
import com.elbuensabor.services.PersonaServiceImpl;
import org.hibernate.mapping.Any;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/articuloManufacturado")
public class ArticuloManufacturadoController extends BaseControllerImpl<ArticuloManufacturado, ArticuloManufacturadoServiceImpl>{

    @PostMapping("/saveDetalle")
    public ResponseEntity<?> saveDetalle(@RequestBody JSONObject jsonString) {
        try {
            System.out.println("entra");

            return ResponseEntity.status(HttpStatus.OK).body(servicio.saveDetalle(jsonString));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"error\":\"Error. Por favor intente más tarde.\"}");
        }
    }
}
