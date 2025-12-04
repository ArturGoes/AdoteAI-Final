package com.adotematch.ai;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
<<<<<<< HEAD

                .requestMatchers(
                    "/",
                    "/index.html",
                    "/assets/**",
                    "/*.ico",
                    "/*.png",
                    "/*.svg",
                    "/*.jpg",
                    "/*.json",
                    "/manifest.json"
                ).permitAll()
                // FIM DA CORREÇÃO
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/match").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )

            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
=======
                .requestMatchers("/api/**").permitAll()
                .anyRequest().permitAll()
            );
>>>>>>> parent of 885fae4 (Merge pull request #3 from ArturGoes/frontend-final)

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:5173", 
            "http://localhost:5174", 
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174"
        ));
        
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}