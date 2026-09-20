package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Coupon findByCode(String code);
    

}
