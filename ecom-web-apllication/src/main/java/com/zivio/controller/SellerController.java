package com.zivio.controller;

import com.zivio.Service.EmailServcie;
import com.zivio.Service.SellerReportService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.AuthService;
import com.zivio.Service.SellerService;
import com.zivio.domain.AccountStatus;
import com.zivio.exceptions.SellerException;
import com.zivio.model.Seller;
import com.zivio.model.SellerReport;
import com.zivio.model.VerificationCode;
import com.zivio.repository.VerificationCodeRepository;
import com.zivio.request.LoginRequest;
import com.zivio.responce.AuthResponce;
import com.zivio.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {
    private final EmailServcie emailServcie;
    private final SellerService sellerService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final AuthService authService;
    private final SellerReportService sellerReportService;

    @PostMapping("/login")

    public ResponseEntity<AuthResponce> loginSeller(
            @RequestBody LoginRequest req) throws Exception {

        String otp = req.getOtp();
        String email = req.getEmail();
        System.out.println(email + " " + otp);
        req.setEmail("seller_" + email);
        AuthResponce authResponce = authService.siging(req);
        return ResponseEntity.ok(authResponce);

    }

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new Exception("wrong otp..");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);

        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Seller> createSeller(
            @RequestBody Seller seller) throws Exception {

        Seller savedSeller = sellerService.createSeller(seller);

        String email = savedSeller.getEmail().trim();

        VerificationCode isExist = verificationCodeRepository.findByEmail(email);

        if (isExist != null) {
            verificationCodeRepository.delete(isExist);
        }

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "ZIVIO Bazar Email Verification Code";
        String text = "Welcome to ZIVIO Bazar, verify your account using this OTP: ";
        String frontend_url = " http://localhost:3000/verify-seller/";

        emailServcie.sendVerificationOtpEmail(
                email,
                verificationCode.getOtp(),
                subject,
                text + otp + frontend_url);

        return new ResponseEntity<>(savedSeller, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception {

        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerByJwt(
            @RequestHeader("Authorization") String jwt) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);

        return new ResponseEntity<>(seller, HttpStatus.OK);

    }

    public ResponseEntity<SellerReport> getSellerReport(
            @RequestHeader("Authorization") String jwt) throws SellerException, Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);
        return new ResponseEntity<>(report, HttpStatus.OK);

    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellers(
            @RequestParam(required = false) AccountStatus status) {
        List<Seller> sellers = sellerService.getAllSellers(status);
        return ResponseEntity.ok(sellers);

    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt,
            @RequestBody Seller seller) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);
        return ResponseEntity.ok(updatedSeller);
    }

    public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }

}
