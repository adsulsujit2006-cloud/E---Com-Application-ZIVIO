package com.zivio.request;

import com.zivio.domain.USER_ROLE;

import lombok.Data;

@Data
public class LoginOtpRequest {
    private String email;
    private String otp;
    USER_ROLE role;

}
