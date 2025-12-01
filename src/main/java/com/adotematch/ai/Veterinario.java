package com.adotematch.ai;

import com.adotematch.ai.model.Adotante; // Import necessário para herança se houver
import com.adotematch.ai.Animal;

public class Veterinario extends Usuario {

    public Veterinario(String email, String senha, String nome) {
        super(email, senha, nome, Role.VETERINARIO);
    }

    @Override
    public void atualizarPerfil(String novoNome) {
        this.nome = novoNome;
    }

    // RF10: Atualizar vacinas
    // CORREÇÃO: Extraímos o nome da vacina (String) antes de adicionar na lista
    public void atualizarVacina(Animal animal, Vacina vacina, boolean tomada) {
        if (tomada) {
            animal.adicionarVacinaTomada(vacina.getNome());
        } else {
            animal.adicionarVacinaPendente(vacina.getNome());
        }
    }
}
