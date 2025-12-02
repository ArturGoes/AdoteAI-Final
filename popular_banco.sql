-- 1. Criar Schema se não existir
CREATE SCHEMA IF NOT EXISTS adocao_animais;

-- 2. Limpar dados antigos para garantir uma inserção limpa
TRUNCATE TABLE adocao_animais.fotos_animal CASCADE;
TRUNCATE TABLE adocao_animais.animal CASCADE;

-- 3. Inserir Animais com IDs Explícitos (Para garantir integridade com as fotos)
INSERT INTO adocao_animais.animal (id_animal, nome, raca, idade, sexo, tamanho, temperamento, cor, localizacao, status, data_entrada) VALUES
(1, 'Thor', 'Vira-lata', 3, 'Macho', 'Grande', 'ATIVO', 'Branco e Marrom', 'São Paulo, SP', 'DISPONIVEL', NOW()),
(2, 'Luna', 'Golden Retriever', 2, 'Fêmea', 'Médio', 'SOCIÁVEL', 'Dourado', 'Rio de Janeiro, RJ', 'DISPONIVEL', NOW()),
(3, 'Max', 'Pastor Alemão', 4, 'Macho', 'Grande', 'ATIVO', 'Preto e Capa', 'Belo Horizonte, MG', 'DISPONIVEL', NOW()),
(4, 'Mel', 'Poodle', 1, 'Fêmea', 'Pequeno', 'SOCIÁVEL', 'Branco', 'Curitiba, PR', 'DISPONIVEL', NOW()),
(5, 'Rocky', 'Bulldog', 5, 'Macho', 'Médio', 'CALMO', 'Branco', 'Porto Alegre, RS', 'ADOTADO', NOW()),
(6, 'Bella', 'Beagle', 3, 'Fêmea', 'Médio', 'ATIVO', 'Tricolor', 'Salvador, BA', 'DISPONIVEL', NOW()),
(7, 'Zeus', 'Husky Siberiano', 2, 'Macho', 'Grande', 'ATIVO', 'Cinza e Branco', 'Brasília, DF', 'DISPONIVEL', NOW()),
(8, 'Mimi', 'Gato Persa', 4, 'Fêmea', 'Pequeno', 'CALMO', 'Branco', 'Fortaleza, CE', 'DISPONIVEL', NOW()),
(9, 'Toby', 'Chihuahua', 1, 'Macho', 'Pequeno', 'ATIVO', 'Preto e Branco', 'Recife, PE', 'DISPONIVEL', NOW()),
(10, 'Nina', 'Vira-lata', 3, 'Fêmea', 'Médio', 'SOCIÁVEL', 'Caramelo', 'Manaus, AM', 'ADOTADO', NOW());

-- 4. Inserir Fotos (Agora seguro, pois os IDs acima são fixos)
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

-- 5. Atualizar a sequência do ID para evitar erros ao inserir novos animais via aplicação
-- (O nome da sequência geralmente segue o padrão: nome_tabela_nome_coluna_seq)
SELECT setval('adocao_animais.animal_id_animal_seq', (SELECT MAX(id_animal) FROM adocao_animais.animal));