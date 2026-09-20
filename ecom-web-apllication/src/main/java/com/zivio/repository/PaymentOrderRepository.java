package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.PaymentOrder;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long>{

    PaymentOrder findByPaymentLinkId(String paymentId);

    


}
