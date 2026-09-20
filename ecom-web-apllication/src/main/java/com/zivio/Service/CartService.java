package com.zivio.Service;

import com.zivio.model.Cart;
import com.zivio.model.CartItem;
import com.zivio.model.Product;
import com.zivio.model.User;

public interface CartService {
    public CartItem addCartItem(
        User user,
        Product product,
        String size,
        int quantity
    );
    public Cart findUserCart(User user);

}
