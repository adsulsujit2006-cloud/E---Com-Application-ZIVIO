package com.zivio.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.zivio.domain.PaymentMethod;
import com.zivio.domain.PaymentOrderStatus;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentOrder {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    @Enumerated(EnumType.STRING)
    private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String paymentLinkId;

    @ManyToOne 
    private User user;

    @OneToMany 
    private Set<Order> orders = new HashSet<>();

}