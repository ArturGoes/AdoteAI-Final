package com.adotematch.ai;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@MappedSuperclass
public abstract class Usuario {
    protected String uuid;
    protected String email;
    protected String senha;
    protected String nome;
    protected Role role;

    public enum Role {
        ADOTANTE, ADMINISTRADOR, VETERINARIO
    }

    public Usuario(String email, String senha, String nome, Role role) {
        this.uuid = java.util.UUID.randomUUID().toString();
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.role = role;
    }

    public abstract void atualizarPerfil(String novoNome);
}
