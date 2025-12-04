package com.adotematch.ai;

import com.adotematch.ai.model.Adotante;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "adocao", schema = "adocao_animais")
@Data 
@NoArgsConstructor
public class Adocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_adotante", nullable = false)
    private Adotante adotante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_animal", nullable = false)
    private Animal animal;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataSolicitacao;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        PENDENTE, APROVADA, REJEITADA
    }

    public Adocao(Adotante adotante, Animal animal) {
        this.adotante = adotante;
        this.animal = animal;
        this.dataSolicitacao = new Date();
        this.status = Status.PENDENTE;
    }
}