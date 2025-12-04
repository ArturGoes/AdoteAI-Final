package com.adotematch.ai;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Abrigo {
    private final String id;
    private String nome;
    private String endereco;
    private String cidade;
    private List<Animal> animaisDisponiveis;

    public Abrigo(String nome, String endereco, String cidade) {
        this.id = UUID.randomUUID().toString();
        this.nome = nome;
        this.endereco = endereco;
        this.cidade = cidade;
        this.animaisDisponiveis = new ArrayList<>();
    }

    // Getters e Setters completos
    public String getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    public List<Animal> getAnimaisDisponiveis() { return animaisDisponiveis; }
    public void setAnimaisDisponiveis(List<Animal> animaisDisponiveis) { this.animaisDisponiveis = animaisDisponiveis; }

    public void adicionarAnimal(Animal animal) {
        animaisDisponiveis.add(animal);
    }

    public List<Animal> buscarAnimaisPorFiltro(String raca, int idadeMax) {
        List<Animal> resultados = new ArrayList<>();
        for (Animal a : animaisDisponiveis) {
            if (a.getRaca().equalsIgnoreCase(raca) && a.getIdade() <= idadeMax) {
                resultados.add(a);
            }
        }
        return resultados;
    }
}