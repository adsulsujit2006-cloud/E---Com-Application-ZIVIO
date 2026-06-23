package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {

}