package com.zivio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.OrderService;
import com.zivio.Service.PaymentService;
import com.zivio.Service.SellerReportService;
import com.zivio.Service.SellerService;
import com.zivio.Service.UserService;
import com.zivio.model.Order;
import com.zivio.model.PaymentOrder;
import com.zivio.model.Seller;
import com.zivio.model.SellerReport;
import com.zivio.model.User;
import com.zivio.responce.Apiresponce;
import com.zivio.responce.PaymentLinkResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final UserService userService;
    private final SellerService sellerService;
    private final OrderService orderService;
    private final SellerReportService sellerReportService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<Apiresponce> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        boolean paymentSuccess = paymentService.ProceedPaymentOrder(
                paymentOrder,
                paymentId,
                paymentLinkId);

        if (paymentSuccess) {

            for (Order order : paymentOrder.getOrders()) {

                // transactionService.createTransaction(order);

                Seller seller = sellerService.getSellerById(order.getSellerId());

                SellerReport report = sellerReportService.getSellerReport(seller);

                report.setTotalOrders(report.getTotalOrders() + 1);
                report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales() + order.getOrderItem().size());

                sellerReportService.updateSellerReport(report);
            }
        }

        Apiresponce res = new Apiresponce();
        res.setMessage("Payment successful");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

}
