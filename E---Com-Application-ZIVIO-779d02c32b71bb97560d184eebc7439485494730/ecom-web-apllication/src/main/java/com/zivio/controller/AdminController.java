package com.zivio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.SellerService;
import com.zivio.domain.AccountStatus;
import com.zivio.model.Seller;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {

    private final SellerService sellerService;

    public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id,
        @PathVariable AccountStatus status) throws Exception 
    {
        Seller updatedSeller = sellerService.updateSellerAccountStatus(id, status);
        
        return ResponseEntity.ok(updatedSeller);
    } 

}
