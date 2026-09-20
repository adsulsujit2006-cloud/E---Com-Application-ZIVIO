package com.zivio.Service.Impl;

import com.zivio.repository.UserRepository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.zivio.Service.CouponService;
import com.zivio.model.Cart;
import com.zivio.model.Coupon;
import com.zivio.model.User;
import com.zivio.repository.CartRepository;
import com.zivio.repository.CouponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final UserRepository userRepository;
    private final CouponRepository coupanRepository;
    private final CartRepository cartRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {

        Coupon coupon = coupanRepository.findByCode(code);

        Cart cart = cartRepository.findByUserId(user.getId());

        if (coupon == null) {
            throw new Exception("Coupon not found");
        }
        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon already used");
        }
        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("valied for minimum order value" + coupon.getMinimumOrderValue());
        }
        if (coupon.isActive() && LocalDate.now().isAfter(coupon.getValidityStartDate())
                && LocalDate.now().isBefore(coupon.getValidateEndDate())) {
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);
            double discountPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountPrice);
            cart.setCoupanCode(code);
            cartRepository.save(cart);
            return cart;
        }
        throw new Exception("Coupon is not valid");

    }

    @Override
    public Cart removeCoupon(String couponCode, User user) throws Exception {
        Coupon coupon = coupanRepository.findByCode(couponCode);

        if (coupon == null) {
            throw new Exception("Coupon not found...");
        }
        Cart cart = cartRepository.findByUserId(user.getId());

        double discountPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;
        cart.setTotalSellingPrice(cart.getTotalSellingPrice() + discountPrice);
        cart.setCoupanCode(null);
        return cartRepository.save(cart);

    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return coupanRepository.findById(id).orElseThrow(() -> new Exception("Coupon not found  "));

    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return coupanRepository.save(coupon);
       
    }

    @Override
    public List<Coupon> findAllCoupans() {
        return coupanRepository.findAll();
       
    }

    @Override
     @PreAuthorize("hasRole ('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        coupanRepository.deleteById(id);
    }

}
