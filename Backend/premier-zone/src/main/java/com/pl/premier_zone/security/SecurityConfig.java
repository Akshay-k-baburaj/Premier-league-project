package com.pl.premier_zone.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/**")
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configure(http))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/matches/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/teams/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v1/news/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/standings/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/scorers/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/comparison/{team1Id}/{team2Id}/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v1/player/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/v4/matches/*/comments", "GET")).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}