package com.umayece.todolist_demo.controller;

import com.umayece.todolist_demo.dto.AuthResponse;
import com.umayece.todolist_demo.dto.LoginRequest;
import com.umayece.todolist_demo.dto.RegisterRequest;
import com.umayece.todolist_demo.model.User;
import com.umayece.todolist_demo.service.JwtService;
import com.umayece.todolist_demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegisterRequest registerRequest) {
        boolean isRegistered = userService.registerUser(registerRequest);

        Map<String, String> response = new HashMap<>();

        if (isRegistered) {
            response.put("message", "User registered successfully.");
            return ResponseEntity.ok(response); // JSON olarak döndürdük
        } else {
            response.put("error", "Username already exists.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login request: " + loginRequest);

        // Kullanıcı doğrulama
        User user = userService.validateUser(loginRequest.username(), loginRequest.password());
        if (user != null) {
            System.out.println("User validated: " + user.getUsername());

            // Kullanıcı için JWT oluştur
            String token = jwtService.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, "success"));
        }

        System.out.println("Invalid credentials for: " + loginRequest.username());
        AuthResponse authResponse = new AuthResponse("invalid", loginRequest.username());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
    }


}
