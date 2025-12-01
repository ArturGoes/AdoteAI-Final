package com.adotematch.ai;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private String nome; // Adicionado para o Frontend

    @Column(nullable = false)
    private String raca;

    private int idade;
    private String sexo;
    private String tamanho;
    
    @Column(nullable = false)
    private String localizacao; // Adicionado para o Frontend

    @Enumerated(EnumType.STRING)
    private Temperamento temperamento;

    private String cor;

    @ElementCollection
    @CollectionTable(name = "vacinas_tomadas", joinColumns = @JoinColumn(name = "id_animal"))
    @Column(name = "vacina")
    private List<String> vacinasTomadas = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "vacinas_pendentes", joinColumns = @JoinColumn(name = "id_animal"))
    @Column(name = "vacina")
    private List<String> vacinasPendentes = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "fotos_animal", joinColumns = @JoinColumn(name = "id_animal"))
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

    public enum Temperamento { CALMO, ATIVO, TIMIDO, SOCIÁVEL }
    public enum Status { DISPONIVEL, ADOTADO, TRANSFERIDO }

    // Métodos auxiliares
    public void adicionarVacinaTomada(String vacina) { vacinasTomadas.add(vacina); }
    public void adicionarVacinaPendente(String vacina) { vacinasPendentes.add(vacina); }
    public void adicionarFoto(String fotoUrl) { fotos.add(fotoUrl); }
    
    public void registrarSaida(Date dataSaida, Status novoStatus) {
        this.dataSaida = dataSaida;
        this.status = novoStatus;
    }
}
