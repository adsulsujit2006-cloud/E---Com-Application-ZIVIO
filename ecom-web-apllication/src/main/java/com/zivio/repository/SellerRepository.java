package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Seller;

public interface SellerRepository extends JpaRepository<Seller,Long>{
    Seller findByEmail(String email);

}
