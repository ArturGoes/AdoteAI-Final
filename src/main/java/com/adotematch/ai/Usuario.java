package com.adotematch.ai;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@MappedSuperclass
public abstract class Usuario {

    protected String uuid = java.util.UUID.randomUUID().toString();
    
    protected String email;
    protected String senha;
    protected String nome;

    @Enumerated(EnumType.STRING)
    protected Role role;

    public enum Role {
        ADOTANTE, ADMINISTRADOR, VETERINARIO
    }

    public Usuario(String email, String senha, String nome, Role role) {
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.role = role;
    }

    public abstract void atualizarPerfil(String novoNome);
}