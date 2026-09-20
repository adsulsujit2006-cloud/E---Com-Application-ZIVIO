package com.zivio.request;

import java.util.List;

import lombok.Data;

@Data
public class CreateProductRequest {
    private String title;
    private String description;
    private double price;
    private int mrpPrice;
    private int sellingPrice;
    private String color;
    private List<String> images;
    private String category;
    private String category2;
    private String category3;
    private String category4;
    private String sizes;

    


}
