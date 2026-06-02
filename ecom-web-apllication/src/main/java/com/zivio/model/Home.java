package com.zivio.model;
import java.util.List;

import lombok.Data;
@Data
public class Home {
    private List<HomeCategory>grid;
    
    private List<HomeCategory> shopByCategories;
    private List<HomeCategory> electricCategories;
    private List<HomeCategory> dealCategory;
    private List<Deal> deals;

}

