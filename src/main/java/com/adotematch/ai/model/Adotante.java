package com.adotematch.ai.model;

import com.adotematch.ai.FormularioAdocao;
import com.adotematch.ai.Usuario;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "adotante", schema = "adocao_animais")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adotante extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adotante")
    private Long id;

    private String endereco;
    private String experienciaPets;
    private int espacoEmCasa;
    private int tempoDisponivel;

    @Transient private String preferenciasPersonalidade;
    @Transient private boolean temCriancas;
    @Transient private boolean temOutrosPets;

    // Construtor compatível com lógica antiga
    public Adotante(String email, String senha, String nome, String endereco, int espacoEmCasa, int tempoDisponivel) {
        super(email, senha, nome, Role.ADOTANTE);
        this.endereco = endereco;
        this.espacoEmCasa = espacoEmCasa;
        this.tempoDisponivel = tempoDisponivel;
    }

    @Override
    public void atualizarPerfil(String novoNome) { this.nome = novoNome; }

    public FormularioAdocao preencherFormulario(String pref, boolean criancas, boolean outrosPets, boolean alergias) {
        this.preferenciasPersonalidade = pref;
        this.temCriancas = criancas;
        this.temOutrosPets = outrosPets;
        return new FormularioAdocao(this, espacoEmCasa, tempoDisponivel, pref, criancas, outrosPets, alergias);
    }
}
