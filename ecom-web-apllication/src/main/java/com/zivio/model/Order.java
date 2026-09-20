package com.zivio.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.zivio.domain.OrderStatus;
import com.zivio.domain.PaymentStatus;


import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table (name = "orders")
public class Order {

    @Id 
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    private String orderId;

    @ManyToOne 
    private User user;

    private Long sellerId;

    @OneToMany (mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItem = new ArrayList<>();

    @ManyToOne
    private Address shippingAddress;

    @Embedded 
    private PaymentDetails paymentDetails = new PaymentDetails();

    private double totalMrpPrice;

    private Integer totalSellingPrice;

    private Integer discount;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private int totalItem;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    private LocalDateTime orderDate = LocalDateTime.now();

    private LocalDateTime deliverDate = orderDate.plusDays(7);

}