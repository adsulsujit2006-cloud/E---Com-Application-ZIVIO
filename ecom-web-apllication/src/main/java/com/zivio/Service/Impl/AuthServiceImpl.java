package com.zivio.Service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zivio.Service.AuthService;
import com.zivio.Service.EmailServcie;
import com.zivio.config.JwtProvider;
import com.zivio.domain.USER_ROLE;
import com.zivio.model.Cart;
import com.zivio.model.User;
import com.zivio.model.VerificationCode;
import com.zivio.repository.CartRepository;
import com.zivio.repository.UserRepository;
import com.zivio.repository.VerificationCodeRepository;
import com.zivio.responce.SignupRequest;
import com.zivio.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailServcie emailServcie;


    @Override
    public String createUser(SignupRequest req) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        if(verificationCode==null || !verificationCode.getOtp().equals(req.getOtp())){
            throw new Exception("wrong otp");
        }
        User user = userRepository.findByEmail(req.getEmail());

        if (user == null) {

            User createdUser = new User();

            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("9699567182");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

            user = userRepository.save(createdUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                req.getEmail(),
                null,
                authorities
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public void sentLoginOtp(String email) throws Exception {
       String SIGNING_PREFIX = "signin_";

       if(email.startsWith(SIGNING_PREFIX)){
        email = email.substring(SIGNING_PREFIX.length());
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("user not exist with provided email");
        }
       }
       VerificationCode isExist = verificationCodeRepository.findByEmail(email);

       if(isExist !=null){
        verificationCodeRepository.delete(isExist);
       }
       String otp = OtpUtil.generateOtp();
       VerificationCode verificationCode = new VerificationCode();
       verificationCode.setOtp(otp);
       verificationCode.setEmail(email);
       verificationCodeRepository.save(verificationCode);

       String subject="ZIVIO bazar login/signup otp";
       String text = "your loin/signup otp is - ";


       emailServcie.sendVerificationOtpEmail(email, otp, subject, text);

    }
    
}