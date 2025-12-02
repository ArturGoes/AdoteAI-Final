package com.adotematch.ai;

import com.adotematch.ai.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/match")
public class AIController {

    private final RBC rbc = new RBC();

    @Autowired
    private AnimalRepository animalRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> match(@RequestBody Map<String, Object> preferences) {
        Map<String, Object> response = new HashMap<>();

        try {

            double space = Double.parseDouble(preferences.get("espacoEmCasa").toString());
            double time = Double.parseDouble(preferences.get("tempoDisponivel").toString());
            int prefTemper = Integer.parseInt(preferences.get("preferenciaTemperamento").toString());

            Case newCase = new Case(space, time, prefTemper, 0, 0, 0, 0);
            Case similar = rbc.retrieveSimilarCase(newCase);

            String tamanhoSugerido = similar.getPetSize() == 1 ? "Pequeno" :
                                     similar.getPetSize() == 2 ? "Médio" : "Grande";

            int temperInt = similar.getPetTemper();
            Animal.Temperamento temperamentoSugerido =
                temperInt == 1 ? Animal.Temperamento.CALMO :
                temperInt == 2 ? Animal.Temperamento.ATIVO :
                temperInt == 3 ? Animal.Temperamento.TIMIDO :
                Animal.Temperamento.SOCIÁVEL;

            List<Animal> candidatos = animalRepository.findByTamanho(tamanhoSugerido);

            Optional<Animal> matchPerfeito = candidatos.stream()
                    .filter(a -> a.getTemperamento() == temperamentoSugerido && a.getStatus() == Animal.Status.DISPONIVEL)
                    .findFirst();

            Animal recommendedAnimal;

            if (matchPerfeito.isPresent()) {
                recommendedAnimal = matchPerfeito.get();
            } else if (!candidatos.isEmpty()) {

                recommendedAnimal = candidatos.get(0);
            } else {

                List<Animal> todos = animalRepository.findByStatus(Animal.Status.DISPONIVEL);
                if (!todos.isEmpty()) {
                    recommendedAnimal = todos.get(0);
                } else {
                    response.put("success", false);
                    response.put("message", "Nenhum animal disponível encontrado no momento.");
                    return ResponseEntity.ok(response);
                }
            }

            response.put("success", true);
            response.put("animal", recommendedAnimal);
            response.put("matchScore", similar.getMatch());
            response.put("iaReasoning", "Baseado no seu perfil, recomendamos um animal de porte " + tamanhoSugerido);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Erro ao executar matching: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}