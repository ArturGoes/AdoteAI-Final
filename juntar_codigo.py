import os

# --- CONFIGURAÇÃO PARA JAVA SPRING + REACT/NODE ---

# Extensões que serão lidas
EXTENSOES_ACEITAS = [
    # Backend (Java/Spring)
    '.java', '.xml', '.properties', '.yml', '.yaml', '.sql',
    # Frontend (React/Node/Web)
    '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json'
]

# Pastas que DEVEM ser ignoradas (para não travar seu PC ou enviar lixo)
IGNORAR_PASTAS = [
    'node_modules', # Pasta gigante do Node
    '.git',         # Histórico do git
    'target',       # Compilados do Java
    'dist',         # Build do frontend
    'build',        # Build do frontend
    '.mvn',         # Wrapper do Maven
    '.vscode',      # Configurações do editor
    'coverage',     # Relatórios de teste
    'bin',          # Binários
    'obj'
]

# Arquivos específicos para ignorar (muito grandes e desnecessários)
IGNORAR_ARQUIVOS = ['package-lock.json', 'yarn.lock', 'mvnw', 'mvnw.cmd']

def juntar_projeto():
    nome_saida = 'codigo_completo.txt'
    
    with open(nome_saida, 'w', encoding='utf-8') as outfile:
        # Pega o diretório onde o script está rodando
        diretorio_atual = os.getcwd()
        
        print(f"Lendo arquivos em: {diretorio_atual}")
        print("Isso pode levar alguns segundos...")

        for root, dirs, files in os.walk(diretorio_atual):
            # Remove pastas ignoradas da busca
            dirs[:] = [d for d in dirs if d not in IGNORAR_PASTAS]
            
            for file in files:
                # Pula arquivos específicos ignorados
                if file in IGNORAR_ARQUIVOS:
                    continue

                # Verifica se a extensão é aceita
                if any(file.endswith(ext) for ext in EXTENSOES_ACEITAS):
                    path = os.path.join(root, file)
                    
                    # Evita ler o próprio arquivo de saída ou o script
                    if file == nome_saida or file == 'juntar_codigo.py':
                        continue

                    # Escreve no arquivo final
                    outfile.write(f"\n\n--- INICIO DO ARQUIVO: {path} ---\n")
                    try:
                        with open(path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Erro ao ler arquivo: {e}")
                    outfile.write(f"\n--- FIM DO ARQUIVO: {path} ---\n")

    print(f"\n✅ SUCESSO! O arquivo '{nome_saida}' foi criado.")
    print("Agora copie o conteúdo dele e cole na IA.")

if __name__ == "__main__":
    juntar_projeto()