package com.zivio.Service;

import java.util.List;

import com.zivio.model.Order;
import com.zivio.model.Seller;
import com.zivio.model.Transaction;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionBySellerId(Seller seller);
    List<Transaction> getAllTransaction();

}
