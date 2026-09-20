package com.zivio.Service;

import java.util.List;
import java.util.Set;

import com.zivio.domain.OrderStatus;
import com.zivio.model.Address;
import com.zivio.model.Cart;
import com.zivio.model.Order;
import com.zivio.model.OrderItem;
import com.zivio.model.User;

public interface OrderService {

    Set<Order> createOrder(User user, Address shippingAddress , Cart cart);
    Order findOrderById(Long id) throws Exception;
    List<Order> userOrderHistory(Long userId);
    List<Order> sellersOrders(Long sellerId);
    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;
    Order cancleOrder(Long orderId,User user) throws Exception;
    OrderItem getOrderItemById(Long id) throws Exception;

}
