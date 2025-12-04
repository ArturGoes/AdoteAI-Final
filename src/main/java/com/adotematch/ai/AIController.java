package com.adotematch.ai;

import com.adotematch.ai.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

            int simplifiedPrefTemper = (prefTemper == 1 || prefTemper == 3) ? 1 : 0;

            Case newCase = new Case(space, time, simplifiedPrefTemper, 0, 0, 0, 0);
            Case similar = rbc.retrieveSimilarCase(newCase);

            String tamanhoSugerido = similar.getPetSize() == 1 ? "Pequeno" :
                                     similar.getPetSize() == 2 ? "Médio" : "Grande";

            int temperInt = similar.getPetTemper();

            Animal.Temperamento temperamentoSugerido = (temperInt == 1) ? Animal.Temperamento.CALMO : Animal.Temperamento.ATIVO;

            List<Animal.Temperamento> temperamentosSugeridos =
                (temperamentoSugerido == Animal.Temperamento.CALMO)
                    ? Arrays.asList(Animal.Temperamento.CALMO, Animal.Temperamento.TIMIDO)
                    : Arrays.asList(Animal.Temperamento.ATIVO, Animal.Temperamento.SOCIAVEL);

            List<Animal> candidatosPorTamanho = animalRepository.findByTamanho(tamanhoSugerido);

            List<Animal> candidatosFiltrados = candidatosPorTamanho.stream()
                .filter(a -> a.getStatus() == Animal.Status.DISPONIVEL && temperamentosSugeridos.contains(a.getTemperamento()))
                .collect(Collectors.toList());

            Animal recommendedAnimal;

            if (!candidatosFiltrados.isEmpty()) {

                recommendedAnimal = candidatosFiltrados.get(0);
            } else if (!candidatosPorTamanho.stream().filter(a -> a.getStatus() == Animal.Status.DISPONIVEL).collect(Collectors.toList()).isEmpty()) {

                recommendedAnimal = candidatosPorTamanho.stream().filter(a -> a.getStatus() == Animal.Status.DISPONIVEL).findFirst().get();
            } else {

                List<Animal> todosDisponiveis = animalRepository.findByStatus(Animal.Status.DISPONIVEL);
                if (!todosDisponiveis.isEmpty()) {
                    recommendedAnimal = todosDisponiveis.get(0);
                } else {
                    response.put("success", false);
                    response.put("message", "Nenhum animal disponível encontrado no momento.");
                    return ResponseEntity.ok(response);
                }
            }

            String iaReasoning = String.format(
                "Baseado no seu perfil, recomendamos um animal de porte %s e temperamento %s.",
                tamanhoSugerido.toLowerCase(),
                temperamentoSugerido.toString().toLowerCase()
            );

            response.put("success", true);
            response.put("animal", recommendedAnimal);
            response.put("matchScore", similar.getMatch() > 1 ? similar.getMatch() : similar.getMatch() * 100);
            response.put("iaReasoning", iaReasoning);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.out.println("ERRO NO MATCHING:");
            e.printStackTrace();
            
            response.put("success", false);
            response.put("message", "Erro interno no servidor: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}