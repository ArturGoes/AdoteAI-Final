package com.adotematch.ai;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "animal", schema = "adocao_animais")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_animal")
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String raca;

    private int idade;
    private String sexo;
    private String tamanho;
    
    @Column(nullable = false)
    private String localizacao;

    @Enumerated(EnumType.STRING)
    private Temperamento temperamento;

    private String cor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_abrigo")
    private Abrigo abrigo;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "vacinas_tomadas", schema = "adocao_animais", joinColumns = @JoinColumn(name = "id_animal"))
    @Column(name = "vacina")
    private Set<String> vacinasTomadas = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "vacinas_pendentes", schema = "adocao_animais", joinColumns = @JoinColumn(name = "id_animal"))
    @Column(name = "vacina")
    private Set<String> vacinasPendentes = new HashSet<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "fotos_animal", schema = "adocao_animais", joinColumns = @JoinColumn(name = "id_animal"))
    @Column(name = "foto_url")
    private List<String> fotos = new ArrayList<>();

    @Column(name = "data_entrada")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataEntrada;

    @Column(name = "data_saida")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataSaida;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Temperamento { CALMO, ATIVO, TIMIDO, SOCIAVEL }
    public enum Status { DISPONIVEL, ADOTADO, TRANSFERIDO }

    public void adicionarVacinaTomada(String vacina) { vacinasTomadas.add(vacina); }
    public void adicionarVacinaPendente(String vacina) { vacinasPendentes.add(vacina); }
    public void adicionarFoto(String fotoUrl) { fotos.add(fotoUrl); }
    
    public void registrarSaida(Date dataSaida, Status novoStatus) {
        this.dataSaida = dataSaida;
        this.status = novoStatus;
    }
}