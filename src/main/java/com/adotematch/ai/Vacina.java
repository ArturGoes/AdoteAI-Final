package com.adotematch.ai;

import java.util.Date;

public class Vacina {
    private String nome;
    private Date dataAplicacao;
    private String comprovante;

    public Vacina(String nome, Date dataAplicacao, String comprovante) {
        this.nome = nome;
        this.dataAplicacao = dataAplicacao;
        this.comprovante = comprovante;
    }

    // Getters e Setters completos
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public Date getDataAplicacao() { return dataAplicacao; }
    public void setDataAplicacao(Date dataAplicacao) { this.dataAplicacao = dataAplicacao; }
    public String getComprovante() { return comprovante; }
    public void setComprovante(String comprovante) { this.comprovante = comprovante; }
}