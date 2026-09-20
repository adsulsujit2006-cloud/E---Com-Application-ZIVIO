package com.zivio.model;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "transactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne 
    private User customer;

    @OneToOne 
    private Order order;

    @ManyToOne
    private Seller seller;

    private LocalDateTime date = LocalDateTime.now();

}
