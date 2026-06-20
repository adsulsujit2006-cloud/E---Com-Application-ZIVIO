package com.zivio.Service;

import java.util.Set;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.zivio.model.Order;
import com.zivio.model.PaymentOrder;
import com.zivio.model.User;

public interface PaymentService {
    PaymentOrder createOrder(User user, Set<Order> orders);

    PaymentOrder getPaymentOrderById(Long paymentOrderId) throws Exception;

    PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,
            String paymentId, String paymentLink) throws RazorpayException;

    PaymentLink createRazorpayPaymentLink(User user, Long amount,
            Long orderId) throws RazorpayException;

    String createStripePaymentLink(User user,
            Long amount, Long orderId) throws Exception;

}
