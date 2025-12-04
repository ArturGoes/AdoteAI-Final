package com.adotematch.ai.service;

import com.adotematch.ai.Animal;
import com.adotematch.ai.Case;
import com.adotematch.ai.RBC;
import com.adotematch.ai.dto.MatchRequest;
import com.adotematch.ai.repository.AnimalRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MatchService {

    @Autowired
    private AnimalRepository animalRepository;

    private final RBC rbc = new RBC();

    @Transactional(readOnly = true)
    public Map<String, Object> findMatches(MatchRequest preferences) {
        Map<String, Object> response = new HashMap<>();

        Case similarCase = findSimilarCase(preferences);

        String tamanhoSugerido = similarCase.getPetSize() == 1 ? "Pequeno" :
                                 similarCase.getPetSize() == 2 ? "Médio" : "Grande";
        Animal.Temperamento temperamentoSugerido = (similarCase.getPetTemper() == 1) ? Animal.Temperamento.CALMO : Animal.Temperamento.ATIVO;

        List<Animal.Temperamento> temperamentosSugeridos =
            (temperamentoSugerido == Animal.Temperamento.CALMO)
                ? Arrays.asList(Animal.Temperamento.CALMO, Animal.Temperamento.TIMIDO)
                : Arrays.asList(Animal.Temperamento.ATIVO, Animal.Temperamento.SOCIAVEL);

        List<Animal> candidatos = findCandidates(tamanhoSugerido, temperamentosSugeridos);

        if (candidatos.isEmpty()) {
            response.put("success", false);
            response.put("message", "Nenhum animal compatível foi encontrado com este perfil. Que tal tentar outros filtros?");
            return response;
        }

        candidatos.forEach(this::initializeAnimalCollections);

        String iaReasoning = String.format(
            "Baseado no seu perfil, recomendamos animais de porte %s e temperamento %s.",
            tamanhoSugerido.toLowerCase(),
            temperamentoSugerido.toString().toLowerCase()
        );

        response.put("success", true);
        response.put("animais", candidatos);
        response.put("matchScore", similarCase.getMatch() > 1 ? similarCase.getMatch() : similarCase.getMatch() * 100);
        response.put("iaReasoning", iaReasoning);

        return response;
    }

    private Case findSimilarCase(MatchRequest preferences) {
        double space = preferences.getEspacoEmCasa();
        double time = preferences.getTempoDisponivel();
        int prefTemper = preferences.getPreferenciaTemperamento();
        int simplifiedPrefTemper = (prefTemper == 1 || prefTemper == 3) ? 1 : 0;
        
        Case newCase = new Case(space, time, simplifiedPrefTemper, 0, 0, 0, 0);
        return rbc.retrieveSimilarCase(newCase);
    }

    private List<Animal> findCandidates(String tamanho, List<Animal.Temperamento> temperamentos) {
        // Busca primária com todos os filtros
        List<Animal> candidatos = animalRepository.findByTamanho(tamanho)
            .stream()
            .filter(a -> a.getStatus() == Animal.Status.DISPONIVEL && temperamentos.contains(a.getTemperamento()))
            .collect(Collectors.toList());

        if (candidatos.isEmpty()) {
            candidatos = animalRepository.findByTamanho(tamanho)
                .stream()
                .filter(a -> a.getStatus() == Animal.Status.DISPONIVEL)
                .collect(Collectors.toList());
        }

        return candidatos;
    }

    private void initializeAnimalCollections(Animal animal) {
        Hibernate.initialize(animal.getFotos());
        Hibernate.initialize(animal.getVacinasTomadas());
        Hibernate.initialize(animal.getVacinasPendentes());
        Hibernate.initialize(animal.getAbrigo());
    }
}