package com.adotematch.ai;

import com.adotematch.ai.model.Adotante;

public class FormularioAdocao {
    private Adotante adotante;
    private int espacoEmCasa;
    private int tempoDisponivel;
    private String preferenciasPersonalidade;
    private boolean temCriancas;
    private boolean temOutrosPets;
    private boolean alergias;

    public FormularioAdocao(Adotante adotante, int espacoEmCasa, int tempoDisponivel, String preferencias, boolean temCriancas, boolean temOutrosPets, boolean alergias) {
        this.adotante = adotante;
        this.espacoEmCasa = espacoEmCasa;
        this.tempoDisponivel = tempoDisponivel;
        this.preferenciasPersonalidade = preferencias;
        this.temCriancas = temCriancas;
        this.temOutrosPets = temOutrosPets;
        this.alergias = alergias;
    }

    // Getters e Setters completos
    public Adotante getAdotante() { return adotante; }
    public void setAdotante(Adotante adotante) { this.adotante = adotante; }
    public int getEspacoEmCasa() { return espacoEmCasa; }
    public void setEspacoEmCasa(int espacoEmCasa) { this.espacoEmCasa = espacoEmCasa; }
    public int getTempoDisponivel() { return tempoDisponivel; }
    public void setTempoDisponivel(int tempoDisponivel) { this.tempoDisponivel = tempoDisponivel; }
    public String getPreferenciasPersonalidade() { return preferenciasPersonalidade; }
    public void setPreferenciasPersonalidade(String preferenciasPersonalidade) { this.preferenciasPersonalidade = preferenciasPersonalidade; }
    public boolean isTemCriancas() { return temCriancas; }
    public void setTemCriancas(boolean temCriancas) { this.temCriancas = temCriancas; }
    public boolean isTemOutrosPets() { return temOutrosPets; }
    public void setTemOutrosPets(boolean temOutrosPets) { this.temOutrosPets = temOutrosPets; }
    public boolean isAlergias() { return alergias; }
    public void setAlergias(boolean alergias) { this.alergias = alergias; }

    // Validação (RF4)
    public boolean isValido() {
        return espacoEmCasa > 0 && tempoDisponivel > 0 && !preferenciasPersonalidade.isEmpty();
    }
}