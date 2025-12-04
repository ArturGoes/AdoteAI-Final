package com.adotematch.ai;

import com.adotematch.ai.dto.MatchRequest;
import com.adotematch.ai.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/match")
public class AIController {

    @Autowired
    private MatchService matchService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> match(@RequestBody MatchRequest preferences) {

        Map<String, Object> response = matchService.findMatches(preferences);
        return ResponseEntity.ok(response);
    }
}