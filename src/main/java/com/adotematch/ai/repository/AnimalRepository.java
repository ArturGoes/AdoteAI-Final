package com.adotematch.ai.repository;

import com.adotematch.ai.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByStatus(Animal.Status status);
    List<Animal> findByRaca(String raca);
    List<Animal> findByTamanho(String tamanho);
}
