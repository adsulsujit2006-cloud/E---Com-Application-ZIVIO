package com.zivio.Service.Impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zivio.Service.SellerService;
import com.zivio.config.JwtProvider;
import com.zivio.domain.AccountStatus;
import com.zivio.domain.USER_ROLE;
import com.zivio.exceptions.SellerException;
import com.zivio.model.Address;
import com.zivio.model.Seller;
import com.zivio.repository.AddressRepository;
import com.zivio.repository.SellerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService{

    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
        
    }

  @Override
public Seller createSeller(Seller seller) throws Exception {

    if (seller.getEmail() == null || seller.getEmail().isBlank()) {
        throw new Exception("seller email is required");
    }

    if (seller.getPassword() == null || seller.getPassword().isBlank()) {
        throw new Exception("seller password is required");
    }

    Seller sellerExist = sellerRepository.findByEmail(seller.getEmail().trim());

    if (sellerExist != null) {
        throw new Exception("seller already exist, use different email");
    }

    Address savedAddress = null;

    if (seller.getPickuAddress() != null) {
        savedAddress = addressRepository.save(seller.getPickuAddress());
    }

    Seller newSeller = new Seller();

    newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
    newSeller.setSellerName(seller.getSellerName());

    // important line
    newSeller.setEmail(seller.getEmail().trim());

    newSeller.setPickuAddress(savedAddress);
    newSeller.setGSTIN(seller.getGSTIN());
    newSeller.setRole(USER_ROLE.ROLE_SELLER);
    newSeller.setMobail(seller.getMobail());
    newSeller.setBankDetails(seller.getBankDetails());
    newSeller.setBusinessDetails(seller.getBusinessDetails());

    newSeller.setAccountStatus(AccountStatus.PENDING_VERIFICATION);

    return sellerRepository.save(newSeller);
}
    @Override
    public Seller getSellerById(Long id) throws SellerException {
        return sellerRepository.findById(id)
        .orElseThrow(()-> new SellerException("seller not found with id "+id));
       
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);
        if(seller==null){
            throw new Exception("seller not found ...");
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
       
    }

   @Override
public Seller updateSeller(Long id, Seller seller) throws Exception {

    Seller existingSeller = this.getSellerById(id);

    if (seller.getSellerName() != null) {
        existingSeller.setSellerName(seller.getSellerName());
    }

    if (seller.getMobail() != null) {
        existingSeller.setMobail(seller.getMobail());
    }

    if (seller.getEmail() != null) {
        existingSeller.setEmail(seller.getEmail());
    }

    if (seller.getBusinessDetails() != null
            && seller.getBusinessDetails().getBusinessName() != null) {

        existingSeller.getBusinessDetails()
                .setBusinessName(seller.getBusinessDetails().getBusinessName());
    }

    if (seller.getBankDetails() != null
            && seller.getBankDetails().getAccountHolderName() != null
            && seller.getBankDetails().getAccountNumber() != null
            && seller.getBankDetails().getIfsCode() != null) {

        existingSeller.getBankDetails().setAccountHolderName(
                seller.getBankDetails().getAccountHolderName()
        );

        existingSeller.getBankDetails().setAccountNumber(
                seller.getBankDetails().getAccountNumber()
        );

        existingSeller.getBankDetails().setIfsCode(
                seller.getBankDetails().getIfsCode()
        );
    }

    if (seller.getPickuAddress() != null
            && seller.getPickuAddress().getAddress() != null
            && seller.getPickuAddress().getMobail() != null
            && seller.getPickuAddress().getCity() != null
            && seller.getPickuAddress().getState() != null) {

        existingSeller.getPickuAddress()
                .setAddress(seller.getPickuAddress().getAddress());

        existingSeller.getPickuAddress()
                .setCity(seller.getPickuAddress().getCity());

        existingSeller.getPickuAddress()
                .setState(seller.getPickuAddress().getState());

        existingSeller.getPickuAddress()
                .setMobail(seller.getPickuAddress().getMobail());

        existingSeller.getPickuAddress()
                .setPinCode(seller.getPickuAddress().getPinCode());
    }

    if (seller.getGSTIN() != null) {
        existingSeller.setGSTIN(seller.getGSTIN());
    }

    return sellerRepository.save(existingSeller);
}

    @Override
    public void deleteSeller(Long id) throws Exception {
       Seller seller = getSellerById(id);
       sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setIsEmilVarified(true);
        return sellerRepository.save(seller);
      
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerid, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerid);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }

}
