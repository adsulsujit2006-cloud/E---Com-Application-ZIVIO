package com.zivio.Service;

import java.util.List;

import com.zivio.domain.AccountStatus;
import com.zivio.exceptions.SellerException;
import com.zivio.model.Seller;

public interface SellerService {
    Seller getSellerProfile(String jwt) throws Exception;
    Seller createSeller(Seller seller) throws Exception;
    Seller getSellerById(Long id) throws SellerException;
    Seller getSellerByEmail(String email) throws Exception;
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSeller(Long is, Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    Seller verifyEmail(String email,String otp) throws Exception;
    Seller updateSellerAccountStatus(Long sellerid,AccountStatus status) throws Exception;


}
