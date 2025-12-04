package com.adotematch.ai.repository;

import com.adotematch.ai.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    List<Animal> findByStatus(Animal.Status status);

    List<Animal> findByRaca(String raca);

    List<Animal> findByTamanho(String tamanho);

    @Deprecated
    @Query("SELECT DISTINCT a FROM Animal a LEFT JOIN FETCH a.fotos")
    List<Animal> findAllWithFotos();

    @Query("SELECT DISTINCT a FROM Animal a LEFT JOIN FETCH a.fotos LEFT JOIN FETCH a.vacinasTomadas LEFT JOIN FETCH a.vacinasPendentes")
    List<Animal> findAllWithDetails();
}