package com.zivio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.CartItemService;
import com.zivio.Service.CartService;
import com.zivio.Service.ProductService;
import com.zivio.Service.UserService;
import com.zivio.model.Cart;
import com.zivio.model.CartItem;
import com.zivio.model.Product;
import com.zivio.model.User;
import com.zivio.request.AddItemRequest;
import com.zivio.responce.Apiresponce;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final CartItemService cartItemService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Cart> findUserCartHandler(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartService.findUserCart(user);
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Product product = productService.findProductById(req.getProductId());

        CartItem item = cartService.addCartItem(user, product, req.getSize(), req.getQuantity());

        Apiresponce res = new Apiresponce();
        res.setMessage("Item Added To cart Successfully");

        return new ResponseEntity<>(item, HttpStatus.ACCEPTED);

    }

    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<Apiresponce> deleteCartItemHandler(
            @PathVariable Long cartItemId, @RequestHeader("Authorization") String jwt

    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        Apiresponce res = new Apiresponce();
        res.setMessage("Item Remove from Cart...");

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

    }

    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(
            @PathVariable Long cartItemId,
            @RequestBody CartItem cartItem,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        CartItem updatedCartItem = null;
        if (cartItem.getQuantity() > 0) {
            updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        }
        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }

}
