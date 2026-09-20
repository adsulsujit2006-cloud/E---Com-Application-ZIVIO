package com.zivio.Service;

import java.util.List;

import com.zivio.model.Cart;
import com.zivio.model.Coupon;
import com.zivio.model.User;

public interface CouponService {
    Cart applyCoupon(String couponCode, double orderValue,User user) throws Exception;
    Cart removeCoupon(String couponCode, User user) throws Exception;
    Coupon findCouponById(Long id) throws Exception;
    Coupon createCoupon(Coupon coupon);
    List<Coupon> findAllCoupans();
    void deleteCoupon(Long id) throws Exception;

}
