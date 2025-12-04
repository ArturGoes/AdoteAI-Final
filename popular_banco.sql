CREATE SCHEMA IF NOT EXISTS adocao_animais;

TRUNCATE TABLE adocao_animais.fotos_animal CASCADE;
TRUNCATE TABLE adocao_animais.animal CASCADE;

DROP TABLE IF EXISTS adocao_animais.vacinas_tomadas CASCADE;
DROP TABLE IF EXISTS adocao_animais.vacinas_pendentes CASCADE;


CREATE TABLE IF NOT EXISTS adocao_animais.animal (
    id_animal BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    raca VARCHAR(255) NOT NULL,
    idade INTEGER,
    sexo VARCHAR(50),
    tamanho VARCHAR(50),
    temperamento VARCHAR(50),
    cor VARCHAR(100),
    localizacao VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    data_entrada TIMESTAMP,
    data_saida TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adocao_animais.fotos_animal (
    id_animal BIGINT NOT NULL,
    foto_url VARCHAR(500),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal)
);

CREATE TABLE IF NOT EXISTS adocao_animais.adotante (
    id_adotante BIGSERIAL PRIMARY KEY,
    uuid VARCHAR(255),
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50),
    endereco VARCHAR(255),
    experiencia_pets VARCHAR(255),
    espaco_em_casa INTEGER,
    tempo_disponivel INTEGER
);

CREATE TABLE IF NOT EXISTS adocao_animais.vacinas_tomadas (
    id_animal BIGINT NOT NULL,
    vacina VARCHAR(255),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal)
);

CREATE TABLE IF NOT EXISTS adocao_animais.vacinas_pendentes (
    id_animal BIGINT NOT NULL,
    vacina VARCHAR(255),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal)
);

INSERT INTO adocao_animais.animal (id_animal, nome, raca, idade, sexo, tamanho, temperamento, cor, localizacao, status, data_entrada) VALUES
(1, 'Thor', 'Vira-lata', 3, 'Macho', 'Grande', 'ATIVO', 'Branco e Marrom', 'São Paulo, SP', 'DISPONIVEL', NOW()),
(2, 'Luna', 'Golden Retriever', 2, 'Fêmea', 'Médio', 'SOCIAVEL', 'Dourado', 'Rio de Janeiro, RJ', 'DISPONIVEL', NOW()),
(3, 'Max', 'Pastor Alemão', 4, 'Macho', 'Grande', 'ATIVO', 'Preto e Capa', 'Belo Horizonte, MG', 'DISPONIVEL', NOW()),
(4, 'Mel', 'Poodle', 1, 'Fêmea', 'Pequeno', 'SOCIAVEL', 'Branco', 'Curitiba, PR', 'DISPONIVEL', NOW()),
(5, 'Rocky', 'Bulldog', 5, 'Macho', 'Médio', 'CALMO', 'Branco', 'Porto Alegre, RS', 'ADOTADO', NOW()),
(6, 'Bella', 'Beagle', 3, 'Fêmea', 'Médio', 'ATIVO', 'Tricolor', 'Salvador, BA', 'DISPONIVEL', NOW()),
(7, 'Zeus', 'Husky Siberiano', 2, 'Macho', 'Grande', 'ATIVO', 'Cinza e Branco', 'Brasília, DF', 'DISPONIVEL', NOW()),
(8, 'Mimi', 'Gato Persa', 4, 'Fêmea', 'Pequeno', 'CALMO', 'Branco', 'Fortaleza, CE', 'DISPONIVEL', NOW()),
(9, 'Toby', 'Chihuahua', 1, 'Macho', 'Pequeno', 'ATIVO', 'Preto e Branco', 'Recife, PE', 'DISPONIVEL', NOW()),
(10, 'Nina', 'Vira-lata', 3, 'Fêmea', 'Médio', 'SOCIAVEL', 'Caramelo', 'Manaus, AM', 'ADOTADO', NOW());

INSERT INTO adocao_animais.fotos_animal (id_animal, foto_url) VALUES
-- Thor (ID 1 - Vira-lata grande, branco e marrom)
(1, 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80'),
(1, 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800&q=80'),
(1, 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'),
(1, 'https://images.unsplash.com/photo-1594149929911-734ab7a8a126?w=800&q=80'),

-- Luna (ID 2 - Golden Retriever)
(2, 'https://images.unsplash.com/photo-1611250186439-d84348596f2c?w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1599421493639-67041852b71f?w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1622419956410-a43477839353?w=800&q=80'),

-- Max (ID 3 - Pastor Alemão)
(3, 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1631758257257-22774a3507d6?w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1552694432-33dd5374a44b?w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1543486337-526848259468?w=800&q=80'),

-- Mel (ID 4 - Poodle branco)
(4, 'https://images.unsplash.com/photo-1587764379873-9781a942a27a?w=800&q=80'),
(4, 'https://images.unsplash.com/photo-1567172352136-a36c9be1352e?w=800&q=80'),
(4, 'https://images.unsplash.com/photo-1615233515250-13f56a59633e?w=800&q=80'),
(4, 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=800&q=80'),

-- Rocky (ID 5 - Bulldog branco)
(5, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7dea1d?w=800&q=80'),
(5, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80'),
(5, 'https://images.unsplash.com/photo-1605463322588-348b3b3a215c?w=800&q=80'),
(5, 'https://images.unsplash.com/photo-1583337130587-5161f28b43f3?w=800&q=80'),

-- Bella (ID 6 - Beagle)
(6, 'https://images.unsplash.com/photo-1558280335-5433d3d52316?w=800&q=80'),
(6, 'https://images.unsplash.com/photo-1607932976214-8237580210aa?w=800&q=80'),
(6, 'https://images.unsplash.com/photo-1579482453880-07b1d5c07e0c?w=800&q=80'),
(6, 'https://images.unsplash.com/photo-1598813102324-a26130934149?w=800&q=80'),

-- Zeus (ID 7 - Husky Siberiano)
(7, 'https://images.unsplash.com/photo-1598875128779-2798036214d2?w=800&q=80'),
(7, 'https://images.unsplash.com/photo-1605562241513-e6a690e0b094?w=800&q=80'),
(7, 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0e4?w=800&q=80'),
(7, 'https://images.unsplash.com/photo-1552129035-26a94833c82e?w=800&q=80'),

-- Mimi (ID 8 - Gato Persa branco)
(8, 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&q=80'),
(8, 'https://images.unsplash.com/photo-1574158622682-e40e6984100d?w=800&q=80'),
(8, 'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=800&q=80'),
(8, 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&q=80'),

-- Toby (ID 9 - Chihuahua preto e branco)
(9, 'https://images.unsplash.com/photo-1605722927357-a3f1b4c6a469?w=800&q=80'),
(9, 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80'),
(9, 'https://images.unsplash.com/photo-1616013653284-a1548e23924f?w=800&q=80'),
(9, 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0e4?w=800&q=80'),

-- Nina (ID 10 - Vira-lata caramelo)
(10, 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80'),
(10, 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80'),
(10, 'https://images.unsplash.com/photo-1585675100433-f728857a2c27?w=800&q=80'),
(10, 'https://images.unsplash.com/photo-1534351450186-e5d801427b2b?w=800&q=80');

INSERT INTO adocao_animais.vacinas_tomadas (id_animal, vacina) VALUES
(1, 'Raiva'),
(1, 'V10'),
(2, 'V10'),
(3, 'Raiva');

INSERT INTO adocao_animais.vacinas_pendentes (id_animal, vacina) VALUES
(2, 'Raiva'),
(3, 'Leishmaniose');


SELECT setval('adocao_animais.animal_id_animal_seq', (SELECT MAX(id_animal) FROM adocao_animais.animal));