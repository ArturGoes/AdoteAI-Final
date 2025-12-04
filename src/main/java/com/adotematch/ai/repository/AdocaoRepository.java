// Crie este novo arquivo em: src/main/java/com/adotematch/ai/repository/AdocaoRepository.java
package com.adotematch.ai.repository;

import com.adotematch.ai.Adocao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdocaoRepository extends JpaRepository<Adocao, Long> {
}