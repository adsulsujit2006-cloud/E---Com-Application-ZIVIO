package com.zivio.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.zivio.Service.HomeService;
import com.zivio.domain.HomeCategorySection;
import com.zivio.model.Deal;
import com.zivio.model.Home;
import com.zivio.model.HomeCategory;
import com.zivio.repository.DealRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final DealRepository dealRepository;
    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {
       List<HomeCategory>  gridCategories = allCategories.stream().filter(category ->
         category.getSection()== HomeCategorySection.GRID).collect(Collectors.toList());
       
         List<HomeCategory>  shopByCategories = allCategories.stream().filter(category ->category.getSection()== HomeCategorySection.SHOP_BY_CATEGORIES).collect(Collectors.toList());

         List<HomeCategory>  electrricCategories = allCategories.stream().filter(category ->category.getSection()== HomeCategorySection.ELECTRIC_CATEGORIES).collect(Collectors.toList());

         List<HomeCategory>  dealCaterCategories = allCategories.stream().filter(category ->category.getSection()== HomeCategorySection.DEALS).toList();

         List<Deal> createDeals = new ArrayList<>();

         if(dealRepository.findAll().isEmpty()){
            List<Deal> deals = allCategories.stream().filter(category ->category.getSection()== HomeCategorySection.DEALS).map(category -> new Deal(null, 10, category)).collect(Collectors.toList());

            createDeals = dealRepository.saveAll(deals);

         }else createDeals = dealRepository.findAll();

         Home home = new Home();
         home.setGrid(gridCategories);
         home.setShopByCategories(shopByCategories);
         home.setElectricCategories(electrricCategories);
         home.setDeals(createDeals);
        return home;
    }

}
