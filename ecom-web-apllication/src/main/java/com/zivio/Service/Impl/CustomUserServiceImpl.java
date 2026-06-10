package com.zivio.Service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.zivio.domain.USER_ROLE;
import com.zivio.model.Seller;
import com.zivio.model.User;
import com.zivio.repository.SellerRepository;
import com.zivio.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    //private static final String SELLER_PREFIX = "seller_";

   @Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    String SELLER_PREFIX = "seller_";

    if (username.startsWith(SELLER_PREFIX)) {

        String email = username.substring(SELLER_PREFIX.length());

        Seller seller = sellerRepository.findByEmail(email);

        if (seller == null) {
            throw new UsernameNotFoundException("seller not found with email " + email);
        }

        return buildUserDetails(
                seller.getEmail(),
                seller.getPassword(),
                seller.getRole()
        );
    }

    User user = userRepository.findByEmail(username);

    if (user == null) {
        throw new UsernameNotFoundException("user not found with email " + username);
    }

    return buildUserDetails(
            user.getEmail(),
            user.getPassword(),
            user.getRole()
    );
}

    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {

        if (role == null) {
            role = USER_ROLE.ROLE_CUSTOMER;
        }

        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(role.toString()));

        return new org.springframework.security.core.userdetails.User(
                email,
                password,
                authorityList
        );
    }
}