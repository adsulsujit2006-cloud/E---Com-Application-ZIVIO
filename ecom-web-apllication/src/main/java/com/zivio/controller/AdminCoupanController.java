package com.zivio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.CouponService;
import com.zivio.Service.UserService;
import com.zivio.model.Cart;
import com.zivio.model.Coupon;
import com.zivio.model.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupans")
public class AdminCoupanController {
    private final CouponService coupanService;
    private final UserService userService;

    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupan(
        @RequestParam String apply,
        @RequestParam String code,
        @RequestParam double orderValue,
        @RequestHeader("Authorization") String jwt

    ) throws Exception{
        User user = userService.findUserByJwtToken(jwt);
        Cart cart;
        if (apply.equals("true")) {
            cart = coupanService.applyCoupon(code, orderValue, user);
        } else {
            cart = coupanService.removeCoupon(code, user);
        }
        return ResponseEntity.ok(cart);
        
    }
    @PostMapping("/admin/create")
    public ResponseEntity<Coupon> createCoupan(@RequestBody Coupon coupon){
        Coupon createdCoupon = coupanService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    } 

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupan(@PathVariable Long id) throws Exception{
        coupanService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }
        
    

}
