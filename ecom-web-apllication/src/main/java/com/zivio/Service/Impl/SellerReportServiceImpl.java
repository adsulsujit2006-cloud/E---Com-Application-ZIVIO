package com.zivio.Service.Impl;

import org.springframework.stereotype.Service;

import com.zivio.Service.SellerReportService;
import com.zivio.model.Seller;
import com.zivio.model.SellerReport;
import com.zivio.repository.SellerReportRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

    private final SellerReportRepository sellerReportRepository;
    @Override
    public SellerReport getSellerReport(Seller seller) {
        SellerReport sr = sellerReportRepository.findBySellerId(seller.getId());

        if(sr==null){
            SellerReport newReport = new SellerReport();
            newReport.setSeller(seller);
            return sellerReportRepository.save(newReport);
        }
        return null;
       
    }
    @Override
    public SellerReport updateSellerReport(SellerReport sellerReport) {
      return sellerReportRepository.save(sellerReport);
    }

}
