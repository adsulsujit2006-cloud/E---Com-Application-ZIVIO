package com.zivio.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zivio.responce.Apiresponce;

@RestController
public class HomeController {

    @GetMapping("/")
    public Apiresponce HomecontrollerHandler() {

        Apiresponce apiresponce = new Apiresponce();
        apiresponce.setMessage("Hello world");

        return apiresponce;
    }
}