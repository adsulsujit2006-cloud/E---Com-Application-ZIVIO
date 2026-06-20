package com.zivio.Service;

import com.zivio.domain.USER_ROLE;
import com.zivio.request.LoginRequest;
import com.zivio.responce.AuthResponce;
import com.zivio.responce.SignupRequest;

public interface AuthService {
    
   
    void sentLoginOtp(String email,USER_ROLE role) throws Exception;
String createUser(SignupRequest req) throws Exception;
AuthResponce siging(LoginRequest req) throws Exception;


}
