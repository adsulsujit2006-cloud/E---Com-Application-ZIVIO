package com.zivio.Service.Impl;

import org.springframework.stereotype.Service;

import com.zivio.Service.CartService;
import com.zivio.model.Cart;
import com.zivio.model.CartItem;
import com.zivio.model.Product;
import com.zivio.model.User;
import com.zivio.repository.CartItemRepositery;
import com.zivio.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final CartItemRepositery cartItemRepositery;

@Override
public CartItem addCartItem(User user, Product product, String size, int quantity) {

    Cart cart = findUserCart(user);

    CartItem isPrsent = cartItemRepositery.findByCartAndProductAndSize(cart, product, size);

    if (isPrsent == null) {

        CartItem cartItem = new CartItem();

        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setUserId(user.getId());
        cartItem.setSize(size);

        int totalPrice = quantity * product.getSellingPrice();
        cartItem.setSellingPrice(totalPrice);

        cartItem.setMrpPrice(quantity * product.getMrpPrice());

        cart.getCartitems().add(cartItem);
        cartItem.setCart(cart);

        return cartItemRepositery.save(cartItem);
    }

    return isPrsent;
}
    @Override
    public Cart findUserCart(User user) {
        Cart cart = cartRepository.findByUserId(user.getId());
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;
        for(CartItem cartItem:cart.getCartitems()){
            totalPrice+=cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem +=cartItem.getQuantity();
        }
        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount( calculateDiscountPercentage(totalPrice,totalDiscountedPrice));
        cart.setTotalItem(totalItem);
        return cart;
    }
     private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        // if (mrpPrice <= 0) {
        //    return 0;
        // }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;

    }

}
