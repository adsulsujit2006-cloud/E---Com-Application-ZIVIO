package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Cart;
import com.zivio.model.CartItem;
import com.zivio.model.Product;

public interface CartItemRepositery extends JpaRepository<CartItem,Long>{

   CartItem findByCartAndProductAndSize(Cart cart,Product product,String size); 

    


}
