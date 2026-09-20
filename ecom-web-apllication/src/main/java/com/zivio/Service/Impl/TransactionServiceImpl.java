package com.zivio.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.zivio.Service.TransactionService;
import com.zivio.model.Order;
import com.zivio.model.Seller;
import com.zivio.model.Transaction;
import com.zivio.repository.SellerRepository;
import com.zivio.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final SellerRepository sellerRepository;

    @Override
    public Transaction createTransaction(Order order) {

        Seller seller = sellerRepository.findById(order.getSellerId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
        transaction.setOrder(order);

        return transactionRepository.save(transaction);

    }

    @Override
    public List<Transaction> getTransactionBySellerId(Seller seller) {
        return transactionRepository.findBySellerId(seller.getId());

    }

    @Override
    public List<Transaction> getAllTransaction() {
        return transactionRepository.findAll();

    }
}
