package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {

}
