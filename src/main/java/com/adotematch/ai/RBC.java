package com.adotematch.ai;

public class RBC {
    private final CaseBase caseBase = new CaseBase();

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
        return best;
    }

    public void retain(Case newCase) {
        caseBase.addCase(newCase);
    }
}