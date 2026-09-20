package com.zivio.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.Category;


public interface CategoryRepositery extends JpaRepository<Category,Long>{
    Category findByCategoryId(String categoryId);

    


}
