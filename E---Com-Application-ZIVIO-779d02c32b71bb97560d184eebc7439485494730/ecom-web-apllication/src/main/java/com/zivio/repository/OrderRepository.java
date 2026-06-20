package com.zivio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Order;

public interface OrderRepository extends JpaRepository<Order,Long>{
    List<Order> findByUserId(Long userId);
    List<Order> findBySellerId(Long sellerId);
    

}
