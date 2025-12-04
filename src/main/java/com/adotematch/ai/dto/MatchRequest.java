package com.adotematch.ai.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MatchRequest {
    private double espacoEmCasa;
    private double tempoDisponivel;
    private int preferenciaTemperamento;
}