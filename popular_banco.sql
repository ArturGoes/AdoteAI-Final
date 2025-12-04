CREATE SCHEMA IF NOT EXISTS adocao_animais;

DROP TABLE IF EXISTS adocao_animais.adocao CASCADE;
DROP TABLE IF EXISTS adocao_animais.fotos_animal CASCADE;
DROP TABLE IF EXISTS adocao_animais.vacinas_tomadas CASCADE;
DROP TABLE IF EXISTS adocao_animais.vacinas_pendentes CASCADE;
DROP TABLE IF EXISTS adocao_animais.animal CASCADE;
DROP TABLE IF EXISTS adocao_animais.adotante CASCADE;
DROP TABLE IF EXISTS adocao_animais.abrigo CASCADE;

CREATE TABLE IF NOT EXISTS adocao_animais.abrigo (
    id_abrigo BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    email VARCHAR(100),
    telefone VARCHAR(20)
);

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
    data_saida TIMESTAMP,
    id_abrigo BIGINT,
    FOREIGN KEY (id_abrigo) REFERENCES adocao_animais.abrigo(id_abrigo)
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

CREATE TABLE IF NOT EXISTS adocao_animais.adocao (
    id BIGSERIAL PRIMARY KEY,
    id_adotante BIGINT NOT NULL,
    id_animal BIGINT NOT NULL,
    data_solicitacao TIMESTAMP,
    status VARCHAR(50),
    FOREIGN KEY (id_adotante) REFERENCES adocao_animais.adotante(id_adotante),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal)
);

CREATE TABLE IF NOT EXISTS adocao_animais.fotos_animal (
    id_animal BIGINT NOT NULL,
    foto_url VARCHAR(500),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS adocao_animais.vacinas_tomadas (
    id_animal BIGINT NOT NULL,
    vacina VARCHAR(255),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS adocao_animais.vacinas_pendentes (
    id_animal BIGINT NOT NULL,
    vacina VARCHAR(255),
    FOREIGN KEY (id_animal) REFERENCES adocao_animais.animal(id_animal) ON DELETE CASCADE
);

INSERT INTO adocao_animais.abrigo (id_abrigo, nome, endereco, email, telefone) VALUES
(1, 'Abrigo Amigos dos Lugares', 'Rua A, 123, SP', 'amigos@abrigo.com', '11-1234-5678'),
(2, 'Abrigo Patas Felizes', 'Av. B, 456, RJ', 'patas@abrigo.com', '21-9876-5432'),
(3, 'Abrigo Resgate Animal', 'Rua C, 789, MG', 'resgate@abrigo.com', '31-1111-2222'),
(4, 'Abrigo Vida Nova', 'Av. D, 101, RS', 'vidanova@abrigo.com', '51-3333-4444');

INSERT INTO adocao_animais.animal (id_animal, nome, raca, idade, sexo, tamanho, temperamento, cor, localizacao, status, data_entrada, id_abrigo) VALUES
(1, 'Thor', 'Vira-lata', 3, 'Macho', 'Grande', 'ATIVO', 'Branco e Marrom', 'São Paulo, SP', 'DISPONIVEL', NOW(), 1),
(2, 'Luna', 'Golden Retriever', 2, 'Fêmea', 'Médio', 'SOCIAVEL', 'Dourado', 'Rio de Janeiro, RJ', 'DISPONIVEL', NOW(), 2),
(3, 'Max', 'Pastor Alemão', 4, 'Macho', 'Grande', 'ATIVO', 'Preto e Capa', 'Belo Horizonte, MG', 'DISPONIVEL', NOW(), 3),
(4, 'Mel', 'Poodle', 1, 'Fêmea', 'Pequeno', 'SOCIAVEL', 'Branco', 'Curitiba, PR', 'DISPONIVEL', NOW(), 4),
(5, 'Rocky', 'Bulldog', 5, 'Macho', 'Médio', 'CALMO', 'Branco', 'Porto Alegre, RS', 'ADOTADO', NOW(), 4),
(6, 'Bella', 'Beagle', 3, 'Fêmea', 'Médio', 'ATIVO', 'Tricolor', 'Salvador, BA', 'DISPONIVEL', NOW(), 2),
(7, 'Zeus', 'Husky Siberiano', 2, 'Macho', 'Grande', 'ATIVO', 'Cinza e Branco', 'Brasília, DF', 'DISPONIVEL', NOW(), 1),
(8, 'Mimi', 'Gato Persa', 4, 'Fêmea', 'Pequeno', 'CALMO', 'Branco', 'Fortaleza, CE', 'DISPONIVEL', NOW(), 3),
(9, 'Toby', 'Chihuahua', 1, 'Macho', 'Pequeno', 'ATIVO', 'Preto e Branco', 'Recife, PE', 'DISPONIVEL', NOW(), 2),
(10, 'Nina', 'Vira-lata', 3, 'Fêmea', 'Médio', 'SOCIAVEL', 'Caramelo', 'Manaus, AM', 'ADOTADO', NOW(), 1);

INSERT INTO adocao_animais.fotos_animal (id_animal, foto_url) VALUES
-- ID 1: Thor (Vira-lata)
(1, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80'), 
(1, 'https://images.unsplash.com/photo-1594149929911-734ab7a8a126?w=400&q=80'), 
(1, 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&q=80'), 
(1, 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=400&q=80'),
-- ID 2: Luna (Golden Retriever)
(2, 'https://images.unsplash.com/photo-1611250186439-d84348596f2c?w=400&q=80'), 
(2, 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=400&q=80'), 
(2, 'https://images.unsplash.com/photo-1599421493639-67041852b71f?w=400&q=80'), 
(2, 'https://images.unsplash.com/photo-1622419956410-a43477839353?w=400&q=80'),
-- ID 3: Max (Pastor Alemão)
(3, 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&q=80'), 
(3, 'https://images.unsplash.com/photo-1631758257257-22774a3507d6?w=400&q=80'), 
(3, 'https://images.unsplash.com/photo-1552694432-33dd5374a44b?w=400&q=80'), 
(3, 'https://images.unsplash.com/photo-1543486337-526848259468?w=400&q=80'),
-- ID 4: Mel (Poodle)
(4, 'https://images.unsplash.com/photo-1587764379873-9781a942a27a?w=400&q=80'), 
(4, 'https://images.unsplash.com/photo-1567172352136-a36c9be1352e?w=400&q=80'), 
(4, 'https://images.unsplash.com/photo-1615233515250-13f56a59633e?w=400&q=80'), 
(4, 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&q=80'),
-- ID 5: Rocky (Bulldog)
(5, 'https://images.unsplash.com/photo-1535930891776-0c2dfb7dea1d?w=400&q=80'), 
(5, 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80'), 
(5, 'https://images.unsplash.com/photo-1605463322588-348b3b3a215c?w=400&q=80'), 
(5, 'https://images.unsplash.com/photo-1583337130587-5161f28b43f3?w=400&q=80'),
-- ID 6: Bella (Beagle)
(6, 'https://images.unsplash.com/photo-1558280335-5433d3d52316?w=400&q=80'), 
(6, 'https://images.unsplash.com/photo-1607932976214-8237580210aa?w=400&q=80'), 
(6, 'https://images.unsplash.com/photo-1579482453880-07b1d5c07e0c?w=400&q=80'), 
(6, 'https://images.unsplash.com/photo-1598813102324-a26130934149?w=400&q=80'),
-- ID 7: Zeus (Husky Siberiano)
(7, 'https://images.unsplash.com/photo-1598875128779-2798036214d2?w=400&q=80'), 
(7, 'https://images.unsplash.com/photo-1605562241513-e6a690e0b094?w=400&q=80'), 
(7, 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0e4?w=400&q=80'), 
(7, 'https://images.unsplash.com/photo-1552129035-26a94833c82e?w=400&q=80'),
-- ID 8: Mimi (Gato Persa)
(8, 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80'), 
(8, 'https://images.unsplash.com/photo-1574158622682-e40e6984100d?w=400&q=80'), 
(8, 'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=400&q=80'), 
(8, 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80'),
-- ID 9: Toby (Chihuahua)
(9, 'https://images.unsplash.com/photo-1605722927357-a3f1b4c6a469?w=400&q=80'), 
(9, 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&q=80'), 
(9, 'https://images.unsplash.com/photo-1616013653284-a1548e23924f?w=400&q=80'), 
(9, 'https://images.unsplash.com/photo-1608636430333-790145b2b934?w=400&q=80'),
-- ID 10: Nina (Vira-lata)
(10, 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&q=80'), 
(10, 'https://images.unsplash.com/photo-1585675100433-f728857a2c27?w=400&q=80'), 
(10, 'https://images.unsplash.com/photo-1534351450186-e5d801427b2b?w=400&q=80'),
(10, 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80');

INSERT INTO adocao_animais.vacinas_tomadas (id_animal, vacina) VALUES
(1, 'Raiva'), (1, 'V10'), (2, 'V10'), (3, 'Raiva');

INSERT INTO adocao_animais.vacinas_pendentes (id_animal, vacina) VALUES
(2, 'Raiva'), (3, 'Leishmaniose');

SELECT setval('adocao_animais.animal_id_animal_seq', (SELECT MAX(id_animal) FROM adocao_animais.animal));
SELECT setval('adocao_animais.abrigo_id_abrigo_seq', (SELECT MAX(id_abrigo) FROM adocao_animais.abrigo));
SELECT setval('adocao_animais.adotante_id_adotante_seq', (SELECT COALESCE(MAX(id_adotante), 1) FROM adocao_animais.adotante), false);
SELECT setval('adocao_animais.adocao_id_seq', (SELECT COALESCE(MAX(id), 1) FROM adocao_animais.adocao), false);