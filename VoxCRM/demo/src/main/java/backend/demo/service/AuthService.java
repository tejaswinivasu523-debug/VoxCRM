package backend.demo.service;

import backend.demo.dto.AuthDtos;
import backend.demo.entity.User;
import backend.demo.repository.UserRepository;
import backend.demo.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    public AuthDtos.AuthResponse register(AuthDtos.RegisterRequest r) {
        if (users.findByEmail(r.email()).isPresent())
            throw new RuntimeException("Email already registered");

        User u = new User();
        u.setName(r.name());
        u.setEmail(r.email());
        u.setPassword(encoder.encode(r.password()));
        u.setRole("USER");
        users.save(u);

        return new AuthDtos.AuthResponse(jwt.generate(u.getEmail()), u.getEmail(), u.getName(), u.getRole());
    }

    public AuthDtos.AuthResponse login(AuthDtos.LoginRequest r) {
        User u = users.findByEmail(r.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(r.password(), u.getPassword()))
            throw new RuntimeException("Invalid email or password");

        return new AuthDtos.AuthResponse(jwt.generate(u.getEmail()), u.getEmail(), u.getName(), u.getRole());
    }
}
