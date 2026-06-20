package com.zivio.Service;

import com.zivio.model.Seller;
import com.zivio.model.SellerReport;

public interface SellerReportService {

    SellerReport getSellerReport(Seller sellerId);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
