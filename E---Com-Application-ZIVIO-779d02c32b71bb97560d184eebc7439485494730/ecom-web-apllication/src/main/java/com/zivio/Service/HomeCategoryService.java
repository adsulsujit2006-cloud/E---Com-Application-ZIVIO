package com.zivio.Service;

import java.util.List;

import com.zivio.model.HomeCategory;

public interface HomeCategoryService {
    HomeCategory createHomeCategory(HomeCategory homeCategory);
    List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
    HomeCategory updateHomeCategory(HomeCategory homeCategory,Long id) throws Exception;
    List<HomeCategory> getAllHomeCategories(); 

}
