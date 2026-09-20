
package com.zivio.config;

import java.util.Arrays;
import java.util.Collections;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF
            .csrf().disable()

            // Enable CORS
            .cors()
            .configurationSource(corsConfigurationSource())
            .and()

            // Stateless session for JWT
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()

            // Authorization
            .authorizeRequests()
                // Public review API
                .antMatchers("/api/*/reviews").permitAll()

                // All other /api requests require authentication
                .antMatchers("/api/**").authenticated()

                // Other requests are public
                .anyRequest().permitAll()
            .and()

            // JWT filter
            .addFilterBefore(
                new JwtTokenValidator(),
                BasicAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        return new CorsConfigurationSource() {

            @Override
            public CorsConfiguration getCorsConfiguration(
                    HttpServletRequest request) {

                CorsConfiguration cfg = new CorsConfiguration();

                // Allowed frontend origins
                cfg.setAllowedOrigins(Arrays.asList(
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:4200"
                ));

                // Allow all HTTP methods
                cfg.setAllowedMethods(
                    Collections.singletonList("*")
                );

                // Allow all headers
                cfg.setAllowedHeaders(
                    Collections.singletonList("*")
                );

                // Headers exposed to frontend
                cfg.setExposedHeaders(
                    Arrays.asList("Authorization")
                );

                // Allow cookies/credentials
                cfg.setAllowCredentials(true);

                // Cache CORS configuration for 1 hour
                cfg.setMaxAge(3600L);

                return cfg;
            }
        };
    }
}
