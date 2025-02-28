package com.pl.premier_zone.user;

import com.pl.premier_zone.security.JwtService;
import com.pl.premier_zone.service.EmailService;
import com.pl.premier_zone.user.dto.UserRegistrationDto;
import com.pl.premier_zone.user.dto.UserLoginDto;
import com.pl.premier_zone.user.dto.AuthResponseDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    public AuthResponseDto registerUser(UserRegistrationDto registrationDto) {
        // Validate if username or email already exists
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        // Create new user
        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));

        userRepository.save(user);
        emailService.sendWelcomeEmail(user.getEmail(), user.getUsername());

        // Generate JWT token
        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponseDto(token, user.getUsername());
    }

    public AuthResponseDto loginUser(UserLoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername());
        if (user == null || !passwordEncoder.matches(loginDto.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtService.generateToken(user.getUsername());
        return new AuthResponseDto(token, user.getUsername());
    }
}