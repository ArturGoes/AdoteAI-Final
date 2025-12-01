package com.adotematch.ai;

public class RBC {
    private final CaseBase caseBase = new CaseBase();

    // Retrieve: Encontra caso similar
    public Case retrieveSimilarCase(Case newCase) {
        Case best = null;
        double minDist = Double.MAX_VALUE;
        for (Case c : caseBase.getCases()) {
            double dist = newCase.distanceTo(c);
            if (dist < minDist) {
                minDist = dist;
                best = c;
            }
        }
        return best;  // Reuse: retorna o caso similar
    }

    // Revise e Retain: simplificado, adicione se necessário
    public void retain(Case newCase) {
        caseBase.addCase(newCase);
    }
}