package com.zivio.model;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.zivio.domain.PaymentStatus;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {

    private String paymentId;
    private String razorpayPaymentLinkId;
    private String razorpayPaymentLinkReferenceId;
    private String razorpayPaymentId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

}