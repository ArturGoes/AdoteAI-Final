import os

BASE_DIR = os.getcwd()
JAVA_PATH = os.path.join(BASE_DIR, "src", "main", "java", "com", "adotematch", "ai")

def write_file(path, content):
    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[CORRIGIDO] {os.path.basename(path)}")
    except Exception as e:
        print(f"[ERRO] {path}: {e}")

# 1. Corrigir Veterinario.java (Erro de tipo Vacina -> String)
def fix_veterinario():
    path = os.path.join(JAVA_PATH, "Veterinario.java")
    content = """package com.adotematch.ai;

import com.adotematch.ai.model.Adotante; // Import necessário para herança se houver
import com.adotematch.ai.Animal;

public class Veterinario extends Usuario {

    public Veterinario(String email, String senha, String nome) {
        super(email, senha, nome, Role.VETERINARIO);
    }

    @Override
    public void atualizarPerfil(String novoNome) {
        this.nome = novoNome;
    }

    // RF10: Atualizar vacinas
    // CORREÇÃO: Extraímos o nome da vacina (String) antes de adicionar na lista
    public void atualizarVacina(Animal animal, Vacina vacina, boolean tomada) {
        if (tomada) {
            animal.adicionarVacinaTomada(vacina.getNome());
        } else {
            animal.adicionarVacinaPendente(vacina.getNome());
        }
    }
}
"""
    write_file(path, content)

# 2. Corrigir AIController.java (Erro de Double -> Int)
def fix_aicontroller():
    path = os.path.join(JAVA_PATH, "AIController.java")
    content = """package com.adotematch.ai;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/match")
public class AIController {

    private final RBC rbc = new RBC();

    @PostMapping
    public ResponseEntity<Map<String, Object>> match(@RequestBody Map<String, Object> preferences) {
        Map<String, Object> response = new HashMap<>();

        try {
            double space = Double.parseDouble(preferences.get("espacoEmCasa").toString());
            double time = Double.parseDouble(preferences.get("tempoDisponivel").toString());
            int prefTemper = Integer.parseInt(preferences.get("preferenciaTemperamento").toString());

            Case newCase = new Case(space, time, prefTemper, 0, 0, 0, 0);
            Case similar = rbc.retrieveSimilarCase(newCase);

            Animal recommendedAnimal = new Animal();
            recommendedAnimal.setTamanho(similar.getPetSize() == 1 ? "Pequeno" :
                                       similar.getPetSize() == 2 ? "Médio" : "Grande");
            
            int temper = similar.getPetTemper();
            recommendedAnimal.setTemperamento(
                temper == 1 ? Animal.Temperamento.CALMO :
                temper == 2 ? Animal.Temperamento.ATIVO :
                temper == 3 ? Animal.Temperamento.TIMIDO :
                Animal.Temperamento.SOCIÁVEL
            );
            
            // CORREÇÃO: Conversão explícita de (double) para (int)
            recommendedAnimal.setIdade((int) similar.getPetAge());

            response.put("success", true);
            response.put("animal", recommendedAnimal);
            response.put("matchScore", similar.getMatch());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erro ao executar matching: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
"""
    write_file(path, content)

# 3. Corrigir AuthController.java (Sintaxe do ResponseEntity)
def fix_authcontroller():
    path = os.path.join(JAVA_PATH, "AuthController.java")
    content = """package com.adotematch.ai;

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
"""
    write_file(path, content)

if __name__ == "__main__":
    print("--- CORRIGINDO ERROS DE COMPILAÇÃO JAVA ---")
    fix_veterinario()
    fix_aicontroller()
    fix_authcontroller()
    print("\nConcluído. Agora tente rodar o 'mvnw clean install' novamente.")