package com.zivio.Service;

import java.util.List;

import com.zivio.model.Home;
import com.zivio.model.HomeCategory;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);

}
