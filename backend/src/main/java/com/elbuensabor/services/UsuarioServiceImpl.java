package com.elbuensabor.services;

import com.elbuensabor.entities.Usuario;
import com.elbuensabor.repositories.BaseRepository;
import com.elbuensabor.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl extends BaseServiceImpl<Usuario, Long> implements UsuarioService {
    public UsuarioServiceImpl(BaseRepository<Usuario, Long> baseRepository) {
        super(baseRepository);
    }

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> searchUID(String uid) throws Exception {
        try {
            List<Usuario> usuario = usuarioRepository.searchUID(uid);
            return usuario;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
