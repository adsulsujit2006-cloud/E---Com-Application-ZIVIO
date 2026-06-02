package com.zivio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zivio.model.User;
import com.zivio.repository.UserRepository;
import com.zivio.responce.SignupRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/signup") 
    public ResponseEntity<User> createUserHandler(@RequestBody SignupRequest req) {

        User user = new User();

        user.setEmail(req.getEmail());
        user.setFullName(req.getFullName());
        user.setMobile(req.getMobile());

        User savedUser = userRepository.save(user);

        return ResponseEntity.ok(savedUser);
    }
}