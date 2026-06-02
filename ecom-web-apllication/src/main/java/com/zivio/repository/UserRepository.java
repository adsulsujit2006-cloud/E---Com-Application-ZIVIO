package com.zivio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zivio.model.User;

public interface UserRepository extends JpaRepository<User,Long>{

    

}
