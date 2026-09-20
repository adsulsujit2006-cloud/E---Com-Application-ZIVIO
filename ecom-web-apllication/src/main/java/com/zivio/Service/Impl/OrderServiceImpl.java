package com.zivio.Service.Impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.zivio.Service.OrderService;
import com.zivio.domain.OrderStatus;
import com.zivio.domain.PaymentStatus;
import com.zivio.model.Address;
import com.zivio.model.Cart;
import com.zivio.model.CartItem;
import com.zivio.model.Order;
import com.zivio.model.OrderItem;
import com.zivio.model.PaymentDetails;
import com.zivio.model.User;
import com.zivio.repository.AddressRepository;
import com.zivio.repository.OrderItemRepository;
import com.zivio.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {

        if (!user.getAddresses().contains(shippingAddress)) {
            user.getAddresses().add(shippingAddress);
        }

        Address address = addressRepository.save(shippingAddress);

        Map<Long, List<CartItem>> itemBySeller = cart.getCartitems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct()
                        .getSeller().getId()));

        Set<Order> orders = new HashSet<>();

        for (Map.Entry<Long, List<CartItem>> entry : itemBySeller.entrySet()) {

            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            int totalMrpPrice = items.stream()
                    .mapToInt(item -> item.getMrpPrice() * item.getQuantity())
                    .sum();

            int totalSellingPrice = items.stream()
                    .mapToInt(item -> item.getSellingPrice() * item.getQuantity())
                    .sum();

            int totalItems = items.stream()
                    .mapToInt(CartItem::getQuantity)
                    .sum();

            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);
            createdOrder.setTotalMrpPrice(totalMrpPrice);
            createdOrder.setTotalSellingPrice(totalSellingPrice);
            createdOrder.setTotalItem(totalItems);
            createdOrder.setShippingAddress(address);
            createdOrder.setOrderStatus(OrderStatus.PENDING);

            PaymentDetails paymentDetails = new PaymentDetails();
            paymentDetails.setStatus(PaymentStatus.PENDING);
            createdOrder.setPaymentDetails(paymentDetails);

            Order savedOrder = orderRepository.save(createdOrder);

            for (CartItem item : items) {

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                OrderItem savedOrderItem = orderItemRepository.save(orderItem);

                savedOrder.getOrderItem().add(savedOrderItem);
            }

            orders.add(orderRepository.save(savedOrder));
        }

        return orders;
    }

    @Override
    public Order findOrderById(Long id) throws Exception {
        return orderRepository.findById(id)
                .orElseThrow(() -> new Exception("order not found with id " + id));
    }

    @Override
    public List<Order> userOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrders(Long sellerId) {
        return orderRepository.findBySellerId(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {

        Order order = findOrderById(orderId);

        order.setOrderStatus(orderStatus);

        return orderRepository.save(order);
    }

    @Override
    public Order cancleOrder(Long orderId, User user) throws Exception {

        Order order = findOrderById(orderId);

        if (!user.getId().equals(order.getUser().getId())) {
            throw new Exception("you don't have access to this order");
        }

        order.setOrderStatus(OrderStatus.CANCELLED);

        return orderRepository.save(order);
    }

    @Override
    public OrderItem getOrderItemById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(()->
        new Exception("order item not exist...."));
       
    }
}