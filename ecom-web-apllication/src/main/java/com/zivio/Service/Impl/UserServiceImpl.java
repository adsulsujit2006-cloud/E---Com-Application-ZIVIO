package com.zivio.Service.Impl;

import org.springframework.stereotype.Service;

import com.zivio.Service.UserService;
import com.zivio.config.JwtProvider;
import com.zivio.model.User;
import com.zivio.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new Exception("User not found with email - " + email);
        }

        return user;
    }
}