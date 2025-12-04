package com.adotematch.ai.service;

import com.adotematch.ai.model.Adotante;
import com.adotematch.ai.repository.AdotanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdotanteService {

    @Autowired
    private AdotanteRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    public Adotante salvar(Adotante adotante) {

        Optional<Adotante> existente = repository.findByEmail(adotante.getEmail());
        
        if (existente.isPresent()) {

            throw new RuntimeException("Este email já está cadastrado. Tente fazer login.");
        }

        adotante.setSenha(encoder.encode(adotante.getSenha()));
        return repository.save(adotante);
    }

    public boolean validarLogin(String email, String senha) {
        Optional<Adotante> opt = repository.findByEmail(email);
        if (opt.isEmpty()) {
            return false;
        }
        
        Adotante a = opt.get();

        return a.getSenha() != null && encoder.matches(senha, a.getSenha());
    }
}