package com.adotematch.ai;

import com.adotematch.ai.model.Adotante;

import java.util.Date;

public class Adocao {
    private final String id;
    private Adotante adotante;
    private Animal animal;
    private Date dataSolicitacao;
    private Status status;

    public enum Status {
        PENDENTE, APROVADA, REJEITADA
    }

    public Adocao(Adotante adotante, Animal animal) {
        this.id = java.util.UUID.randomUUID().toString();
        this.adotante = adotante;
        this.animal = animal;
        this.dataSolicitacao = new Date();
        this.status = Status.PENDENTE;
    }

    // Getters e Setters completos
    public String getId() { return id; }
    public Adotante getAdotante() { return adotante; }
    public void setAdotante(Adotante adotante) { this.adotante = adotante; }
    public Animal getAnimal() { return animal; }
    public void setAnimal(Animal animal) { this.animal = animal; }
    public Date getDataSolicitacao() { return dataSolicitacao; }
    public void setDataSolicitacao(Date dataSolicitacao) { this.dataSolicitacao = dataSolicitacao; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}