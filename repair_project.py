import os
import re
import shutil

# ==============================================================================
# CONFIGURAÇÃO DE CAMINHOS
# ==============================================================================
BASE_DIR = os.getcwd()
SRC_MAIN = os.path.join(BASE_DIR, "src", "main")
JAVA_ROOT = os.path.join(SRC_MAIN, "java", "com", "adotematch", "ai")
RESOURCES_ROOT = os.path.join(SRC_MAIN, "resources")
FRONTEND_ROOT = os.path.join(RESOURCES_ROOT, "frontend")

def log(category, message):
    print(f"[{category.upper()}] {message}")

def write_file(path, content):
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        log("FIXED", f"{os.path.basename(path)}")
    except Exception as e:
        log("ERROR", f"Falha ao escrever {path}: {e}")

def read_file(path):
    if not os.path.exists(path): return None
    with open(path, 'r', encoding='utf-8') as f: return f.read()

# ==============================================================================
# 1. CORREÇÃO DE BUILD E INFRA (POM.XML & PROPERTIES)
# ==============================================================================
def fix_infra():
    # 1.1 POM.XML - Versão do Spring e Dependências
    pom_path = os.path.join(BASE_DIR, "pom.xml")
    content = read_file(pom_path)
    if content:
        # Corrige versão inexistente 3.5.7 para 3.2.3
        content = content.replace("<version>3.5.7</version>", "<version>3.2.3</version>")
        write_file(pom_path, content)

    # 1.2 APPLICATION.PROPERTIES - Banco de Dados Local
    prop_path = os.path.join(RESOURCES_ROOT, "application.properties")
    prop_content = """spring.application.name=ai
# Configuração para PostgreSQL Local (Docker ou Nativo)
spring.datasource.url=jdbc:postgresql://localhost:5432/ai
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Configurações JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.open-in-view=false
"""
    write_file(prop_path, prop_content)

# ==============================================================================
# 2. CORREÇÃO DE ARQUITETURA JAVA (UNIFICAÇÃO DE MODELS)
# ==============================================================================
def fix_java_backend():
    # 2.1 Unificar classe Adotante (Model + Lógica)
    # Isso resolve o erro de "Duplicate Class" e "Method not found"
    model_path = os.path.join(JAVA_ROOT, "model", "Adotante.java")
    adotante_code = """package com.adotematch.ai.model;

import com.adotematch.ai.FormularioAdocao;
import com.adotematch.ai.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "adotante", schema = "adocao_animais")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Adotante extends Usuario { // Estende Usuario para compatibilidade
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_adotante")
    private Long id; // ID Numérico do banco

    // Campos herdados ou específicos mantidos aqui para JPA
    @Column(nullable = false)
    private String endereco;

    @Column(name = "experiencia_pets")
    private String experienciaPets;

    @Column(name = "espaco_em_casa")
    private int espacoEmCasa;

    @Column(name = "tempo_disponivel")
    private int tempoDisponivel;

    // Campos transientes (Lógica de memória, não salvos no banco por enquanto)
    @Transient
    private String preferenciasPersonalidade;
    @Transient
    private boolean temCriancas;
    @Transient
    private boolean temOutrosPets;

    // Construtor para compatibilidade com lógica legada (ex: testes)
    public Adotante(String email, String senha, String nome, String endereco, int espacoEmCasa, int tempoDisponivel) {
        super(email, senha, nome, Role.ADOTANTE);
        this.endereco = endereco;
        this.espacoEmCasa = espacoEmCasa;
        this.tempoDisponivel = tempoDisponivel;
    }

    @Override
    public void atualizarPerfil(String novoNome) {
        this.nome = novoNome;
    }

    // Método lógico usado pelo FormularioAdocao
    public FormularioAdocao preencherFormulario(String preferencias, boolean temCriancas, boolean temOutrosPets, boolean alergias) {
        this.preferenciasPersonalidade = preferencias;
        this.temCriancas = temCriancas;
        this.temOutrosPets = temOutrosPets;
        return new FormularioAdocao(this, espacoEmCasa, tempoDisponivel, preferencias, temCriancas, temOutrosPets, alergias);
    }
}
"""
    write_file(model_path, adotante_code)

    # 2.2 Apagar a classe Adotante duplicada na raiz
    duplicate_path = os.path.join(JAVA_ROOT, "Adotante.java")
    if os.path.exists(duplicate_path):
        os.remove(duplicate_path)
        log("DELETE", "Removida classe duplicada 'Adotante.java' (raiz)")

    # 2.3 Corrigir Usuario.java para ser compatível (classe base)
    usuario_path = os.path.join(JAVA_ROOT, "Usuario.java")
    usuario_code = """package com.adotematch.ai;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@MappedSuperclass
public abstract class Usuario {
    protected String uuid;
    protected String email;
    protected String senha;
    protected String nome;
    protected Role role;

    public enum Role {
        ADOTANTE, ADMINISTRADOR, VETERINARIO
    }

    public Usuario(String email, String senha, String nome, Role role) {
        this.uuid = java.util.UUID.randomUUID().toString();
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.role = role;
    }

    public abstract void atualizarPerfil(String novoNome);
}
"""
    write_file(usuario_path, usuario_code)

    # 2.4 Corrigir Repository (Retorno Optional)
    repo_path = os.path.join(JAVA_ROOT, "repository", "AdotanteRepository.java")
    repo_code = """package com.adotematch.ai.repository;

import com.adotematch.ai.model.Adotante;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdotanteRepository extends JpaRepository<Adotante, Long> {
    Optional<Adotante> findByEmail(String email);
}
"""
    write_file(repo_path, repo_code)

    # 2.5 Corrigir Service (Tratamento de Optional)
    svc_path = os.path.join(JAVA_ROOT, "service", "AdotanteService.java")
    svc_code = """package com.adotematch.ai.service;

import com.adotematch.ai.model.Adotante;
import com.adotematch.ai.repository.AdotanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdotanteService {

    @Autowired
    private AdotanteRepository adotanteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Adotante salvar(Adotante adotante) {
        adotante.setSenha(passwordEncoder.encode(adotante.getSenha()));
        return adotanteRepository.save(adotante);
    }

    public boolean validarLogin(String email, String senha) {
        Optional<Adotante> adotanteOpt = adotanteRepository.findByEmail(email);
        if (adotanteOpt.isEmpty()) return false;
        
        Adotante adotante = adotanteOpt.get();
        return adotante.getSenha() != null && passwordEncoder.matches(senha, adotante.getSenha());
    }
}
"""
    write_file(svc_path, svc_code)

    # 2.6 Varredura de Imports (Corrigir referências quebradas)
    log("SCAN", "Corrigindo imports em todos os arquivos Java...")
    for root, dirs, files in os.walk(JAVA_ROOT):
        for file in files:
            if file.endswith(".java"):
                fpath = os.path.join(root, file)
                content = read_file(fpath)
                changed = False
                
                # Substituir import antigo pelo novo model
                if "import com.adotematch.ai.Adotante;" in content:
                    content = content.replace("import com.adotematch.ai.Adotante;", "import com.adotematch.ai.model.Adotante;")
                    changed = True
                
                # Se estiver no pacote raiz, precisa adicionar o import do model explicitamente
                if "package com.adotematch.ai;" in content and "class " in content:
                    if "Adotante" in content and "import com.adotematch.ai.model.Adotante;" not in content and "class Adotante" not in content:
                        content = content.replace("package com.adotematch.ai;", "package com.adotematch.ai;\n\nimport com.adotematch.ai.model.Adotante;")
                        changed = True
                
                if changed:
                    write_file(fpath, content)

# ==============================================================================
# 3. CORREÇÃO DO FRONTEND (TYPESCRIPT, PROXY, API)
# ==============================================================================
def fix_frontend():
    # 3.1 Configurar Vite Proxy (Conecta 5173 -> 8080)
    vite_path = os.path.join(FRONTEND_ROOT, "vite.config.ts")
    vite_code = """import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
"""
    write_file(vite_path, vite_code)

    # 3.2 Remover tipos duplicados
    types_path = os.path.join(FRONTEND_ROOT, "src", "types.ts")
    if os.path.exists(types_path):
        os.remove(types_path)
        log("DELETE", "Removido 'types.ts' (duplicado)")

    # 3.3 Ajustar BuscarPage.tsx para usar API real
    buscar_path = os.path.join(FRONTEND_ROOT, "src", "pages", "BuscarPage.tsx")
    content = read_file(buscar_path)
    if content and 'mockAnimals' in content:
        # Substituir imports
        content = content.replace('import { mockAnimals } from "@/data/mockAnimals";', 
                                  'import { animalApi, Animal } from "@/services/api";\nimport { useEffect } from "react";')
        
        # Injetar lógica de estado e efeito
        new_logic = """const BuscarPage = () => {
  const [animalsList, setAnimalsList] = useState<Animal[]>([]);
  
  useEffect(() => {
    animalApi.getAll().then(res => setAnimalsList(res.data)).catch(console.error);
  }, []);
"""
        content = re.sub(r'const BuscarPage = \(\) => \{', new_logic, content)
        
        # Trocar uso de mock por estado
        content = content.replace("mockAnimals", "animalsList")
        write_file(buscar_path, content)

    # 3.4 Corrigir Imports nos Componentes (AnimalCard, etc)
    # Procura referências ao arquivo deletado "@/types" e aponta para "@/services/api"
    src_dir = os.path.join(FRONTEND_ROOT, "src")
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                path = os.path.join(root, file)
                c = read_file(path)
                if c and ('from "@/types"' in c or "from '@/types'" in c):
                    c = c.replace('from "@/types"', 'from "@/services/api"')
                    c = c.replace("from '@/types'", "from '@/services/api'")
                    write_file(path, c)

# ==============================================================================
# 4. EXECUÇÃO
# ==============================================================================
def main():
    print("==================================================")
    print("   REPARADOR AUTOMÁTICO DE PROJETO - FULL STACK   ")
    print("==================================================")
    
    try:
        print("\n[PASSO 1] Corrigindo Backend (Java/Spring)...")
        fix_infra()
        fix_java_backend()
        
        print("\n[PASSO 2] Corrigindo Frontend (React/Vite)...")
        fix_frontend()
        
        print("\n==================================================")
        print("   SUCESSO! O PROJETO FOI CORRIGIDO.")
        print("==================================================")
        print("Siga estes passos finais para rodar:")
        print("1. Abra o PostgreSQL e execute: CREATE DATABASE ai;")
        print("2. No terminal (raiz): mvn clean install")
        print("3. No terminal (raiz): mvn spring-boot:run")
        print("4. Em outro terminal (frontend): cd src/main/resources/frontend && npm run dev")
        
    except Exception as e:
        print(f"\n[ERRO FATAL] {e}")

if __name__ == "__main__":
    main()