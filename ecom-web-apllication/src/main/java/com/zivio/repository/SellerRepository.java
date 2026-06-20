package com.zivio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.domain.AccountStatus;
import com.zivio.model.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findByEmail(String email);

    List<Seller> findByAccountStatus(AccountStatus status);
}