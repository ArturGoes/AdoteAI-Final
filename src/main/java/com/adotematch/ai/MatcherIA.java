package com.adotematch.ai;

import java.util.ArrayList;
import java.util.List;

public class MatcherIA {
    // Simples heurística por agora; expandir com ML real
    public List<Animal> recomendarAnimais(FormularioAdocao formulario, List<Animal> animaisDisponiveis) {
        List<Animal> matches = new ArrayList<>();
        for (Animal animal : animaisDisponiveis) {
            if (matchesCompatibilidade(formulario, animal)) {
                matches.add(animal);
            }
        }
        return matches;
    }

    private boolean matchesCompatibilidade(FormularioAdocao form, Animal animal) {
        if (form.getEspacoEmCasa() < 50 && !animal.getTamanho().equals("pequeno")) {
            return false;
        }
        return !(form.getTempoDisponivel() < 4 && animal.getTemperamento() == Animal.Temperamento.ATIVO);
    }

    public String explicarRecomendacao(Animal animal, FormularioAdocao form) {
        return "Compatível com seu espaço pequeno e rotina ativa.";
    }
}