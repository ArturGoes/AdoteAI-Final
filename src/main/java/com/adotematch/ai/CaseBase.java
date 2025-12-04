package com.adotematch.ai;

import java.util.ArrayList;
import java.util.List;

public class CaseBase {
    private final List<Case> cases = new ArrayList<>();

    public CaseBase() {

        cases.add(new Case(100, 8, 1, 1, 1, 5, 1));
        cases.add(new Case(30, 2, 0, 2, 0, 10, 0));
        cases.add(new Case(150, 10, 1, 3, 1, 3, 1));
        cases.add(new Case(60, 4, 0, 1, 0, 7, 0));
        cases.add(new Case(200, 12, 1, 2, 1, 1, 1));

        cases.add(new Case(40, 2, 1, 1, 1, 3, 1));

        cases.add(new Case(50, 6, 0, 1, 0, 2, 1));

        cases.add(new Case(250, 8, 0, 3, 0, 4, 1));

        cases.add(new Case(90, 4, 1, 2, 1, 6, 1));

        cases.add(new Case(90, 5, 0, 2, 0, 3, 1));

        cases.add(new Case(180, 2, 1, 3, 1, 5, 1));

        cases.add(new Case(180, 2, 0, 3, 0, 5, 0));

        cases.add(new Case(70, 3, 1, 2, 1, 8, 1));
        cases.add(new Case(120, 6, 0, 3, 0, 2, 1));
        cases.add(new Case(300, 10, 0, 3, 0, 1, 1));
    }

    public List<Case> getCases() {
        return cases;
    }

    public void addCase(Case newCase) {
        cases.add(newCase);
    }
}