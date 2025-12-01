package com.adotematch.ai;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Simplified Prolog Integrator using embedded knowledge base
 * Pure Java implementation without external Prolog dependencies
 */
public class PrologIntegrator {
    
    private static final Map<String, String[]> BREEDS_DB = new HashMap<>();
    private static final Map<String, String[]> VACCINES_DB = new HashMap<>();

    static {
        // Breed database: name -> [temperament, characteristics]
        BREEDS_DB.put("labrador", new String[]{"ativo", "Amigável, energético, leal"});
        BREEDS_DB.put("poodle", new String[]{"ativo", "Inteligente, treinavél, hipoalergênico"});
        BREEDS_DB.put("bulldog", new String[]{"calmo", "Tranquilo, afeiçoado, esturrado"});
        BREEDS_DB.put("gato", new String[]{"timido", "Independente, asseado, carinhoso"});
        BREEDS_DB.put("pastor_alemao", new String[]{"ativo", "Leal, trabalhador, protetor"});
        BREEDS_DB.put("beagle", new String[]{"sociavel", "Curioso, amigável, caçador"});
        BREEDS_DB.put("pug", new String[]{"calmo", "Companheiro, preguiçoso, afetuoso"});
        BREEDS_DB.put("husky", new String[]{"ativo", "Energético, aventureiro, amigável"});
        
        // Vaccine database: name -> [category, description]
        VACCINES_DB.put("raiva", new String[]{"obrigatoria", "Proteção contra raiva viral"});
        VACCINES_DB.put("detemperamento", new String[]{"recomendada", "Proteção contra cinomose"});
        VACCINES_DB.put("parvovirose", new String[]{"recomendada", "Proteção contra parvovirose"});
        VACCINES_DB.put("leptospirose", new String[]{"recomendada", "Proteção contra leptospirose"});
        VACCINES_DB.put("bordetela", new String[]{"opcional", "Proteção contra tosse dos canis"});
    }

    /**
     * Query dog breeds by temperament
     */
    public List<Map<String, String>> queryDogBreedsByTemper(String temper) {
        List<Map<String, String>> results = new ArrayList<>();
        
        for (Map.Entry<String, String[]> entry : BREEDS_DB.entrySet()) {
            String breed = entry.getKey();
            String[] data = entry.getValue();
            String breedTemper = data[0];
            String characteristics = data[1];
            
            // Match breeds by temperament
            if (breedTemper.toLowerCase().contains(temper.toLowerCase())) {
                Map<String, String> res = new HashMap<>();
                res.put("name", breed);
                res.put("temper", breedTemper);
                res.put("char", characteristics);
                results.add(res);
            }
        }
        
        return results;
    }

    /**
     * Query vaccines by category
     */
    public List<Map<String, String>> queryVaccinesByCategory(String category) {
        List<Map<String, String>> results = new ArrayList<>();
        
        for (Map.Entry<String, String[]> entry : VACCINES_DB.entrySet()) {
            String vaccine = entry.getKey();
            String[] data = entry.getValue();
            String vaccineCategory = data[0];
            String description = data[1];
            
            // Match vaccines by category
            if (vaccineCategory.toLowerCase().contains(category.toLowerCase())) {
                Map<String, String> res = new HashMap<>();
                res.put("name", vaccine);
                res.put("category", vaccineCategory);
                res.put("description", description);
                results.add(res);
            }
        }
        
        return results;
    }

    /**
     * Generic pattern matching similar to Prolog
     */
    public List<Map<String, String>> solveByTraverse(String query) {
        List<Map<String, String>> results = new ArrayList<>();
        
        if (query.contains("breed")) {
            // Extract temperament filter if present
            String temper = query.contains("ativo") ? "ativo" : 
                           query.contains("calmo") ? "calmo" :
                           query.contains("timido") ? "timido" :
                           query.contains("sociavel") ? "sociavel" : "";
            
            if (!temper.isEmpty()) {
                return queryDogBreedsByTemper(temper);
            } else {
                for (Map.Entry<String, String[]> entry : BREEDS_DB.entrySet()) {
                    Map<String, String> res = new HashMap<>();
                    res.put("name", entry.getKey());
                    res.put("temper", entry.getValue()[0]);
                    res.put("char", entry.getValue()[1]);
                    results.add(res);
                }
            }
        } else if (query.contains("vaccine")) {
            return queryVaccinesByCategory("");
        }
        
        return results;
    }
}
