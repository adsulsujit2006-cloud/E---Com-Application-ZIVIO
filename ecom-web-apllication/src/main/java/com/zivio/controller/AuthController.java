package com.zivio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zivio.Service.AuthService;
import com.zivio.domain.USER_ROLE;
import com.zivio.model.VerificationCode;
import com.zivio.repository.UserRepository;
import com.zivio.responce.Apiresponce;
import com.zivio.responce.AuthResponce;
import com.zivio.responce.SignupRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponce> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        String jwt = authService.createUser(req);

        AuthResponce res = new AuthResponce();
        res.setJwt(jwt);
        res.setMessage("register success");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/send/signup-otp")
    public ResponseEntity<Apiresponce> sentOtpHandler(@RequestBody VerificationCode req) throws Exception {

        authService.sentLoginOtp(req.getEmail());

        Apiresponce res = new Apiresponce();
        res.setMessage("otp sent successfully");

        return ResponseEntity.ok(res);
    }
}