package com.adotematch.ai;

public class Case {
    private final double adopterSpace;
    private final double adopterTime;
    private final int adopterPrefTemper;
    private final int petSize;
    private final int petTemper;
    private final double petAge;
    private final int match;

    public Case(double adopterSpace, double adopterTime, int adopterPrefTemper, int petSize, int petTemper, double petAge, int match) {
        this.adopterSpace = adopterSpace;
        this.adopterTime = adopterTime;
        this.adopterPrefTemper = adopterPrefTemper;
        this.petSize = petSize;
        this.petTemper = petTemper;
        this.petAge = petAge;
        this.match = match;
    }

    // Getters
    public double getAdopterSpace() { return adopterSpace; }
    public double getAdopterTime() { return adopterTime; }
    public int getAdopterPrefTemper() { return adopterPrefTemper; }
    public int getPetSize() { return petSize; }
    public int getPetTemper() { return petTemper; }
    public double getPetAge() { return petAge; }
    public int getMatch() { return match; }

    public double distanceTo(Case other) {
        return Math.sqrt(
                Math.pow(adopterSpace - other.adopterSpace, 2) +
                Math.pow(adopterTime - other.adopterTime, 2) +
                Math.pow(adopterPrefTemper - other.adopterPrefTemper, 2)
        );
    }
}