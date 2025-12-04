package com.adotematch.ai;

import com.adotematch.ai.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {

    @Autowired
    private AnimalRepository animalRepository;

    @GetMapping
    public ResponseEntity<List<Animal>> listarTodos() {

        List<Animal> animais = animalRepository.findAllWithFotos();
        return ResponseEntity.ok(animais);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> buscarPorId(@PathVariable Long id) {

        Optional<Animal> animal = animalRepository.findById(id);
        return animal.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Animal> criar(@RequestBody Animal animal) {

        Animal novoAnimal = animalRepository.save(animal);
        return ResponseEntity.ok(novoAnimal);
    }
}