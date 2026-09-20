package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport,Long>{
    SellerReport findBySellerId(Long sellerId);

}
