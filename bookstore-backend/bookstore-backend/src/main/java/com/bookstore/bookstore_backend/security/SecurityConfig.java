package com.bookstore.bookstore_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

   private final JwtAuthFilter jwtAuthFilter;

   public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
       this.jwtAuthFilter = jwtAuthFilter;
   }

   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       http
           .csrf(csrf -> csrf.disable())
		   .cors(cors -> cors.configurationSource(corsConfigurationSource()))
           .authorizeHttpRequests(auth -> auth
               .requestMatchers("/api/auth/**").permitAll()
               .requestMatchers("/api/books/**").permitAll()
			   .requestMatchers("/api/orders/**").authenticated()
               .requestMatchers("/api/wishlist/**").authenticated()	  
               .anyRequest().authenticated()
           )
           .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

       // ✅ Correct way in Spring Security 6+
       http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

       return http.build();
   }
   
   

   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
       return config.getAuthenticationManager();
   }
   
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
   
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	 // @Bean
	 //    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	 //        http
	 //            .csrf(csrf -> csrf.disable()) // disable CSRF for Postman testing
	 //            .authorizeHttpRequests(auth -> auth
	 //                .anyRequest().permitAll() // allow all requests without auth
	 //            );

	 //        return http.build();
	 //    }

	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200", "http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
	
	
}
