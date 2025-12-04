package com.adotematch.ai;

import java.util.Date;

public class Administrador extends Usuario {
    
    private Abrigo abrigoGerenciado;

    public Administrador(String email, String senha, String nome, Abrigo abrigo) {
        super(email, senha, nome, Role.ADMINISTRADOR);
        this.abrigoGerenciado = abrigo;
    }

    public Abrigo getAbrigoGerenciado() {
        return abrigoGerenciado;
    }

    public void setAbrigoGerenciado(Abrigo abrigoGerenciado) {
        this.abrigoGerenciado = abrigoGerenciado;
    }

    @Override
    public void atualizarPerfil(String novoNome) {
        this.nome = novoNome;
    }

    public void cadastrarAnimal(Animal animal) {

        animal.setAbrigo(this.abrigoGerenciado);
    }

    public void aprovarAdocao(Adocao adocao) {
        adocao.setStatus(Adocao.Status.APROVADA);
        adocao.getAnimal().registrarSaida(new Date(), Animal.Status.ADOTADO);
    }
}