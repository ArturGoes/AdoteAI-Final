package com.adotematch.ai;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "abrigo", schema = "adocao_animais")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Abrigo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_abrigo")
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String endereco;
    private String email;
    private String telefone;

    @OneToMany(mappedBy = "abrigo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Animal> animais = new ArrayList<>();
}