package com.adotematch.ai;

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
