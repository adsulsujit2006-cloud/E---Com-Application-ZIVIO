package com.zivio.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.CartService;
import com.zivio.Service.OrderService;
import com.zivio.Service.UserService;
import com.zivio.domain.PaymentMethod;
import com.zivio.model.Address;
import com.zivio.model.Cart;
import com.zivio.model.Order;
import com.zivio.model.OrderItem;
import com.zivio.model.User;
import com.zivio.responce.PaymentLinkResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;


  @PostMapping()
public ResponseEntity<PaymentLinkResponse> createOrderHandler(
        @RequestBody Address shippingAddress,
        @RequestParam PaymentMethod paymentMethod,
        @RequestHeader("Authorization") String jwt
) throws Exception {

   User user = userService.findUserByJwtToken(jwt);
   Cart cart = cartService.findUserCart(user);
   Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);

   PaymentLinkResponse res = new PaymentLinkResponse();
  

   return new ResponseEntity<>(res,HttpStatus.OK);
}

@GetMapping("/user")
public ResponseEntity<List<Order>> userOrderHistoryHandler(
    @RequestHeader("Authorization") String jwt
) throws Exception{

    User user = userService.findUserByJwtToken(jwt);
    List<Order> orders = orderService.userOrderHistory(user.getId());

    
    return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    
}
@GetMapping("/{orderId}")
public ResponseEntity<OrderItem> getOrderById(
    @PathVariable Long orderItemId, @RequestHeader("Authorization") String jwt
) throws Exception{
    User user = userService.findUserByJwtToken(jwt);
    OrderItem orderItem = orderService.getOrderItemById(orderItemId);
    return new ResponseEntity<>(orderItem,HttpStatus.ACCEPTED);
}

public ResponseEntity<Order> cancleOrder(
    @PathVariable Long orderId,
    @RequestHeader("Authorization") String jwt
){
    return null;
    
}

}
