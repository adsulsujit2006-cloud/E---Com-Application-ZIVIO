package com.zivio.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.Service.HomeCategoryService;
import com.zivio.Service.HomeService;
import com.zivio.model.Home;
import com.zivio.model.HomeCategory;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategory(
            @RequestBody List<HomeCategory> homeCategories) {

        List<HomeCategory> categories =
                homeCategoryService.createCategories(homeCategories);

        Home home = homeService.createHomePageData(categories);

        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }
}