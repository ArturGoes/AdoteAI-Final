package com.adotematch.ai;

import com.adotematch.ai.model.Adotante;
import com.adotematch.ai.repository.AdocaoRepository;
import com.adotematch.ai.repository.AdotanteRepository;
import com.adotematch.ai.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/adocao")
public class AdocaoController {

    @Autowired
    private AdocaoRepository adocaoRepository;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private AdotanteRepository adotanteRepository;

    @PostMapping
    @Transactional
    public ResponseEntity<Map<String, Object>> solicitarAdocao(@RequestBody Map<String, Long> payload) {
        Long animalId = payload.get("animalId");
        Long adotanteId = payload.get("adotanteId");

        Animal animal = animalRepository.findById(animalId)
            .orElseThrow(() -> new RuntimeException("Animal com ID " + animalId + " não encontrado."));
        
        Adotante adotante = adotanteRepository.findById(adotanteId)
            .orElseThrow(() -> new RuntimeException("Adotante com ID " + adotanteId + " não encontrado."));

        if (animal.getStatus() != Animal.Status.DISPONIVEL) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Este animal não está mais disponível para adoção.");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        Adocao novaAdocao = new Adocao(adotante, animal);
        adocaoRepository.save(novaAdocao);

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("success", true);
        successResponse.put("message", "Processo de adoção iniciado com sucesso!");
        
        return ResponseEntity.ok(successResponse);
    }
}