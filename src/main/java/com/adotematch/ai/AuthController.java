package com.adotematch.ai;

import com.adotematch.ai.service.AdotanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdotanteService adotanteService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("senha");

        Map<String, Object> response = new HashMap<>();

        if (email == null || senha == null) {
            response.put("success", false);
            response.put("message", "Email e senha são obrigatórios");
            return ResponseEntity.badRequest().body(response);
        }

        boolean isValid = adotanteService.validarLogin(email, senha);
        if (isValid) {
            response.put("success", true);
            response.put("message", "Login realizado com sucesso");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Credenciais inválidas");
            // CORREÇÃO: Sintaxe compatível com Spring Boot 3.x
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
