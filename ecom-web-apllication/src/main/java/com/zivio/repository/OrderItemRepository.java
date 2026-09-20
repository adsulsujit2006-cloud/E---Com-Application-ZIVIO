package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

import com.zivio.model.OrderItem;


public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}