package com.adotematch.ai;

import java.util.ArrayList;
import java.util.List;

public class CaseBase {
    private final List<Case> cases = new ArrayList<>();

    public CaseBase() {
        // Popular com dados sintéticos do seu relatório (1000 amostras simplificadas para 5 exemplos)
        cases.add(new Case(100, 8, 1, 1, 1, 5, 1));
        cases.add(new Case(30, 2, 0, 2, 0, 10, 0));
        cases.add(new Case(150, 10, 1, 0, 1, 3, 1));
        cases.add(new Case(60, 4, 0, 1, 0, 7, 0));
        cases.add(new Case(200, 12, 1, 2, 1, 1, 1));
        // Adicione mais baseados no Python code do relatório
    }

    public List<Case> getCases() {
        return cases;
    }

    public void addCase(Case newCase) {
        cases.add(newCase);
    }
}
