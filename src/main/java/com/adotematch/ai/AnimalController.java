package com.adotematch.ai;

import com.adotematch.ai.repository.AnimalRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<Animal>> listarTodos() {

        List<Animal> animais = animalRepository.findAllWithDetails();
        return ResponseEntity.ok(animais);
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {
        Optional<Animal> animalOptional = animalRepository.findById(id);
        
        if (animalOptional.isPresent()) {
            Animal animal = animalOptional.get();

            Hibernate.initialize(animal.getFotos());
            Hibernate.initialize(animal.getVacinasTomadas());
            Hibernate.initialize(animal.getVacinasPendentes());

            Hibernate.initialize(animal.getAbrigo());
            
            return ResponseEntity.ok(animal);
        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Animal> criar(@RequestBody Animal animal) {

        Animal novoAnimal = animalRepository.save(animal);
        return ResponseEntity.ok(novoAnimal);
    }
}