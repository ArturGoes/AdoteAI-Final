import os

BASE_DIR = os.getcwd()
JAVA_MODEL_PATH = os.path.join(BASE_DIR, "src", "main", "java", "com", "adotematch", "ai")
ROOT_PACKAGE_JSON = os.path.join(BASE_DIR, "package.json")

def write_file(path, content):
    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[ATUALIZADO] {os.path.basename(path)}")
    except Exception as e:
        print(f"[ERRO] {path}: {e}")

# 1. Atualizar Animal.java para ter NOME e LOCALIZAÇÃO
def update_animal_entity():
    path = os.path.join(JAVA_MODEL_PATH, "Animal.java")
    content = """package com.adotematch.ai;

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
"""
    write_file(path, content)

# 2. Remover package.json da raiz (que atrapalha)
def remove_root_package_json():
    if os.path.exists(ROOT_PACKAGE_JSON):
        os.remove(ROOT_PACKAGE_JSON)
        print("[REMOVIDO] package.json da raiz (estava incorreto)")

# 3. Gerar Script SQL para popular o banco
def generate_sql_script():
    sql = """
-- 1. Criar Schema se não existir
CREATE SCHEMA IF NOT EXISTS adocao_animais;

-- 2. Limpar dados antigos (opcional)
TRUNCATE TABLE adocao_animais.fotos_animal CASCADE;
TRUNCATE TABLE adocao_animais.animal CASCADE;

-- 3. Inserir Animais (Dados do Mock)
INSERT INTO adocao_animais.animal (nome, raca, idade, sexo, tamanho, temperamento, cor, localizacao, status, data_entrada) VALUES
('Thor', 'Vira-lata', 3, 'Macho', 'Grande', 'ATIVO', 'Branco e Marrom', 'São Paulo, SP', 'DISPONIVEL', NOW()),
('Luna', 'Golden Retriever', 2, 'Fêmea', 'Médio', 'SOCIÁVEL', 'Dourado', 'Rio de Janeiro, RJ', 'DISPONIVEL', NOW()),
('Max', 'Pastor Alemão', 4, 'Macho', 'Grande', 'ATIVO', 'Preto e Capa', 'Belo Horizonte, MG', 'DISPONIVEL', NOW()),
('Mel', 'Poodle', 1, 'Fêmea', 'Pequeno', 'SOCIÁVEL', 'Branco', 'Curitiba, PR', 'DISPONIVEL', NOW()),
('Rocky', 'Bulldog', 5, 'Macho', 'Médio', 'CALMO', 'Branco', 'Porto Alegre, RS', 'ADOTADO', NOW()),
('Bella', 'Beagle', 3, 'Fêmea', 'Médio', 'ATIVO', 'Tricolor', 'Salvador, BA', 'DISPONIVEL', NOW()),
('Zeus', 'Husky Siberiano', 2, 'Macho', 'Grande', 'ATIVO', 'Cinza e Branco', 'Brasília, DF', 'DISPONIVEL', NOW()),
('Mimi', 'Gato Persa', 4, 'Fêmea', 'Pequeno', 'CALMO', 'Branco', 'Fortaleza, CE', 'DISPONIVEL', NOW()),
('Toby', 'Chihuahua', 1, 'Macho', 'Pequeno', 'ATIVO', 'Preto e Branco', 'Recife, PE', 'DISPONIVEL', NOW()),
('Nina', 'Vira-lata', 3, 'Fêmea', 'Médio', 'SOCIÁVEL', 'Caramelo', 'Manaus, AM', 'ADOTADO', NOW());

-- 4. Inserir Fotos (Vinculando pelo ID gerado, assumindo sequencial 1 a 10)
INSERT INTO adocao_animais.fotos_animal (id_animal, foto_url) VALUES
(1, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80'),
(4, 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800&q=80'),
(5, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80'),
(6, 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80'),
(7, 'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&q=80'),
(8, 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80'),
(9, 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=800&q=80'),
(10, 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80');
"""
    
    path = os.path.join(BASE_DIR, "popular_banco.sql")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(sql)
    print(f"[CRIADO] Script SQL salvo em: {path}")

if __name__ == "__main__":
    print("--- FINALIZANDO ESTRUTURA ---")
    update_animal_entity()
    remove_root_package_json()
    generate_sql_script()
    print("\n[IMPORTANTE] Siga os passos abaixo para ver os animais na tela:")