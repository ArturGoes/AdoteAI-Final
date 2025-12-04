package com.adotematch.ai.dto;

import com.adotematch.ai.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private Usuario.Role role;

    public static UserResponseDTO fromAdotante(com.adotematch.ai.model.Adotante adotante) {
        return new UserResponseDTO(
            adotante.getId(),
            adotante.getNome(),
            adotante.getEmail(),
            adotante.getRole()
        );
    }
}