package com.elbuensabor.controllers;

import com.elbuensabor.entities.Usuario;
import com.elbuensabor.services.UsuarioServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "api/v1/usuario")
public class UsuarioController extends BaseControllerImpl<Usuario, UsuarioServiceImpl> {

    @GetMapping("/searchUID{uid}")
    public ResponseEntity<?> searchUID(@RequestParam String uid) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.searchUID(uid));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(("{\"error\": \"" + e.getMessage() + "\"}"));
        }
    }
}
