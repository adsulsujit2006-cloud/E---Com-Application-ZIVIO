package com.zivio.Service.Impl;

import org.springframework.stereotype.Service;

import com.zivio.Service.CartItemService;
import com.zivio.model.CartItem;
import com.zivio.model.User;
import com.zivio.repository.CartItemRepositery;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService{

    private final CartItemRepositery cartItemRepositery;
    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
      CartItem item = findCartItemById(id);

      User cartItemUser = item.getCart().getUser();
      if(cartItemUser.getId().equals(userId)){
        item.setQuantity(cartItem.getQuantity());
        item.setMrpPrice(item.getQuantity()*item.getProduct().getMrpPrice());
        item.setSellingPrice(item.getQuantity()*item.getProduct().getSellingPrice());
        return cartItemRepositery.save(item);
      }
      throw new Exception("you can't updte this cartItem");
      
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws Exception {
      CartItem item = findCartItemById(cartItemId);
      User cartItemUser = item.getCart().getUser();

      if(cartItemUser.getId().equals(userId)){
        cartItemRepositery.delete(item);
      }else throw new Exception("you can't delete this item");
    }

    @Override
    public CartItem findCartItemById(Long id) throws Exception {
       return cartItemRepositery.findById(id).orElseThrow(()->
      new Exception("cart item not found with id "+id));
    }

}
